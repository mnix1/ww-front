import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {getText, TEXT_REQUIREMENT} from "../../lang/langText";
import error from "../../media/image/icon/error.svg";

export default class Requirement extends React.PureComponent {

    static propTypes = {
        text: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {
        className: ''
    };

    render() {
        const {text, className, style} = this.props;
        return <div className={`requirement notAllowed absolute left0 top0 height100 fontSize06Rem ${className}`} style={style}>
            <div className='justifyCenter flexColumn height100'>
                <div className='justifyCenter relative' style={{padding: '0.25rem 0'}}>
                    <div className={`requirementBackground absoluteBackgroundMix`}/>
                    <img className='marginAuto relative' alt='' src={error} height={20}/>
                    <div className='justifyCenter relative flexColumn'>
                        <div className=''>{getText(TEXT_REQUIREMENT)}:</div>
                        <div className=''>{getText(text)}</div>
                    </div>
                </div>
            </div>
        </div>
    }

}
