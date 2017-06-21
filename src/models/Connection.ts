import { FaceApiResponse } from "../types/response";

export default class Connection {
    constructor(token: string) {
        this.subscriptionKey = token;
    }

    async callFaceApiFromUrlAsync(imageUrl: string) {
        const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,glasses,emotion";

        let data = {
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": this.subscriptionKey
            },
            method: "post",
            body: JSON.stringify({ url: imageUrl })
        };

        let res: Array<FaceApiResponse> = await this.fetchItems(url, data);
        return res;
    }

    subscriptionKey: string;

    async fetchItems(url: string, data: any) {
        const res = await fetch(url, data);

        if (res.status !== 200) {
            let err = await res.json();
            alert("200:" + JSON.stringify(err));
            throw new Error("リソースを読み込めませんでした");
        }

        return await res.json()
            .catch(() => {
                throw new Error("JSONの形式が正しくありません");
            });
    }
}



