var fs = require('fs');
var glob = require('glob');
var fsExtra = require('fs-extra');

var Zip = require('node-zip');
var jsforce = require('jsforce');

class DeployStaticResource {
    constructor(options = {}) {
        this.options = options;
        this.conn = new jsforce.Connection({ loginUrl: this.options.salesforce.loginUrl });
    }

    apply(compiler) {
        compiler.plugin('after-emit', this.uploadFiles.bind(this))
    }

    uploadFiles(compilation, done) {
        // fsExtra.copySync('pkg', 'dist');
        let resource = this.createDeployData(this.options.resource);
        this.deploy(resource);
    }

    deploy(resource) {
        console.log('Login...');

        this.conn.login(this.options.salesforce.username, this.options.salesforce.password + (this.options.salesforce.token || ''), (err, res) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Connected to Salesforce. Uploading resource.');
                this.conn.metadata.upsert('StaticResource', resource, (err, results) => {
                    if (err)
                        console.error(err);
                    else {
                        if (results && results.length) {
                            results.filter((r) => !r.success).forEach((r) => console.error(r));
                        }
                    }

                    console.log('deploy completed!');
                });
            }
        });
    }

    createDeployData(resource) {
        let zip = new Zip();
        // 拡張子が無いと無視される
        glob.sync(resource.dir + "/**/*.*").filter(x => !resource.release || !x.match(/bundle.js.map/)).forEach((file) => {
            zip.file(file.replace(resource.dir + "/", ""), fs.readFileSync(file, 'utf8'));
        });

        return {
            fullName: resource.name,
            content: zip.generate({ base64: true, compression: 'DEFLATE' }),
            contentType: 'application/zip'
        };
    }
}

module.exports = DeployStaticResource;