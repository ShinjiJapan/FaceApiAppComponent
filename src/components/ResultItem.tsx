import * as React from "react";
import { FaceApiResponse } from "../types/response";
import PieChart from "react-svg-piechart";
import VfUtil from "../util/VfUtil";

interface ResultItemProps {
    data: FaceApiResponse;
    closeCallout: Function;
    imgUrl: string;
}
interface ResultItemStates {
    frameStyle: any;
}

/**
 * CallOut内に表示する結果1件ごとのItem
 */
export default class ResultItem extends React.Component<ResultItemProps, ResultItemStates> {

    constructor() {
        super();
        this.state = { frameStyle: {} };
    }

    colors = {
        "anger": "red",
        "contempt": "#8f8",
        "disgust": "#666",
        "fear": "#ccf",
        "happiness": "orange",
        "neutral": "#bbb",
        "sadness": "blue",
        "surprise": "pink",
    };

    /**
     * 数値をtoStringして末尾にpxを付ける
     * @param val 値
     */
    private toPx(val: number) {
        return val.toString() + "px";
    }

    /**
     * 画像の圧縮率に応じて赤枠の座標やサイズを調整
     */
    private imageOnLoad() {
        const img = new Image();
        img.src = this.props.imgUrl;

        const x = 200 / img.width;
        const y = 200 / img.height;

        const rect = this.props.data.faceRectangle;
        this.setState({
            frameStyle: {
                border: "red solid 2px",
                width: this.toPx(rect.width * x),
                height: this.toPx(rect.height * y),
                position: "absolute",
                left: this.toPx(rect.left * x),
                top: this.toPx(rect.top * y)
            }
        });
    }

    /**
     * 選択されたItemの値を画面のフィールドにセット
     */
    private onClick() {
        VfUtil.setFieldValues(this.props.data.faceAttributes);
        this.props.closeCallout();
    }

    render() {
        if (!this.props.data || !this.props.data.faceAttributes.emotion) return null;
        const emotion = this.props.data.faceAttributes.emotion;
        const emotions = Object.keys(emotion).filter(x => emotion[x]).map(key => { return { label: key, value: emotion[key] * 1000, color: this.colors[key] }; });

        return <div className="resultItemRoot" onClick={() => { this.onClick(); }}>
            <div style={{ position: "relative", display: "inline-block" }} >
                <img src={this.props.imgUrl} onLoad={() => this.imageOnLoad()} style={{ width: "200px", height: "200px" }} />
                <div style={this.state.frameStyle} />
            </div>
            <div className="resultDetail">
                {
                    Object.keys(this.props.data.faceAttributes).filter(x => x !== "emotion").map((key, i) => (
                        <div key={i}>
                            {key + " : " + this.props.data.faceAttributes[key]}
                        </div>
                    ))
                }
            </div>

            <div className="chartArea">
                <PieChart data={emotions} sectorStrokeWidth="0" />
            </div>
            <div className="graphLegend">
                {
                    emotions.map((element, i) => (
                        <div key={i}>
                            <span style={{ background: element.color, width: "10px", height: "10px", display: "inline-block" }}></span>
                            <span>
                                {" " + element.label} : {element.value / 10}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>;
    }
}
