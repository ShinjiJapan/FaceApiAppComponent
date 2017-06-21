import * as React from "react";
import Loading from "./Loading";
import ResultCallOut from "./ResultList";
import Connection from "../models/Connection";
import VfUtil from "../util/VfUtil";
import { FaceApiResponse } from "../types/response";

export interface CognitiveButtonStates {
    isLoading: boolean;
    isCalloutOpen: boolean;
    response: Array<FaceApiResponse>;
}

/**
 * 判定ボタン
 */
export default class CognitiveButton extends React.Component<null, CognitiveButtonStates> {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            isCalloutOpen: false,
            response: [],
        };
    }
    url: string = "";
    /**
     * 判定ボタンクリック時の処理
     */
    private async onclick() {
        this.setState({ isLoading: true });

        // 画面の値をクリア
        VfUtil.clearFieldValues();
        // 画像URLの取得
        let urls = VfUtil.getImageUrlStrings();
        if (!urls && urls.length === 0) return;
        this.url = urls[0];

        // Face APIをコール
        let con = new Connection(FaceApiParams.SubscriptionKey);
        let res = await con.callFaceApiFromUrlAsync(this.url);
        if (!res || res.length === 0) return;
        this.setState({ isLoading: false, isCalloutOpen: true, response: res });

        // APIの取得結果を画面にセット
        VfUtil.setFieldValues(res[0].faceAttributes);
    }

    // CallOutのtargetとして自身のElementを使用
    buttonElm: HTMLElement;

    render() {
        return <div>
            <button type="button"
                ref={(x: HTMLElement) => { this.buttonElm = x; }}
                onClick={() => { this.onclick(); }}
            >{FaceApiParams.ButtonLable || "判定"}</button>
            {(this.state.isCalloutOpen)
                ? <ResultCallOut
                    targetElement={this.buttonElm}
                    response={this.state.response}
                    imgUrl={this.url}
                    closeCallout={() => { this.setState({ isCalloutOpen: false }); }} />
                : null
            }
            <Loading isBusy={this.state.isLoading} />
        </div>;
    }
}