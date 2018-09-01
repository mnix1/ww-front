import React from 'react';
import '../battle/page/styles.css';
import Surrender from "./Surrender";
import Modal from "../../../component/modal/Modal";

export default class Options extends React.PureComponent {

    render() {
        const {onShowOptionsChange} = this.props;
        const content = <div>
            <Surrender {...this.props}/>
        </div>;
        return <Modal renderExit={true} content={content} onExitClick={() => onShowOptionsChange(false)}/>
    }
}