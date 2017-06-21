import * as React from "react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

interface LoadingProps {
    isBusy: boolean;
}

/**
 * 通信中のSpinner
 */
export default class Loading extends React.Component<LoadingProps, null> {
    render() {
        return (this.props.isBusy)
            ? <div className="spinnerMask">
                <Spinner className="spinnerContent" size={SpinnerSize.large} />
            </div>
            : null;
    }
}
