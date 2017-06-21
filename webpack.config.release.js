var deploy = require('./deploy.js');

let options = {
    salesforce: {
        username: 'username@hoge.com',
        password: 'password',
        token: '',
        loginUrl: 'https://login.salesforce.com'
    },
    resource:
    {
        name: 'FaceApiComponentResource',
        dir: 'dist/',
        release:true
    }
}

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [

            {
                test: /\.tsx?$/,
                use: ["awesome-typescript-loader"]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new deploy(options)
    ]
};