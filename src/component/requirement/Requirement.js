import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {getText, TEXT_REQUIREMENT} from "../../lang/langText";
import error from "../../media/image/icon/error.svg";
import connect from "react-redux/es/connect/connect";

class Requirement extends React.PureComponent {

    static propTypes = {
        text: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {
        className: ''
    };

    render() {
        const {text, className, style, screen} = this.props;
        return <div className={`requirement notAllowed absolute left0 top0 height100 width100 fontSize06Rem ${className}`} style={style}>
            <div className='justifyCenter flexColumn height100'>
                <div className='justifyAround relative' style={{padding: '0.25rem 0'}}>
                    <div className={`requirementBackground absoluteBackgroundMix`} style={{opacity: 0.8}}/>
                    <img draggable="false" className='relative' alt='' src={error} height={screen.fontSizeRem} style={{margin: 'auto 0'}}/>
                    <div className='justifyCenter relative flexColumn'>
                        <div className=''>{getText(TEXT_REQUIREMENT)}</div>
                        <div className=''>{text}</div>
                    </div>
                </div>
            </div>
        </div>
    }

}


export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({
    })
)(Requirement);

