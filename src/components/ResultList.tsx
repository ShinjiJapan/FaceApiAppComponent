import * as React from "react";
import { Callout } from "office-ui-fabric-react/lib/Callout";
import { FaceApiResponse } from "../types/response";
import ChartItem from "./ResultItem";

interface ResultListProps {
    targetElement: HTMLElement;
    closeCallout: Function;
    imgUrl: string;
    response: Array<FaceApiResponse>;
}

export default class ResultList extends React.Component<ResultListProps, null> {
    render() {
        return <Callout
            gapSpace={0}
            targetElement={this.props.targetElement}
            onDismiss={(ev: any) => { this.props.closeCallout(ev); }}
            setInitialFocus={true}>
            <div>
                {this.props.response.map((res, i) => { return <ChartItem key={i} data={res} imgUrl={this.props.imgUrl} closeCallout={this.props.closeCallout} />; })}
            </div>
        </Callout >;
    }
}
