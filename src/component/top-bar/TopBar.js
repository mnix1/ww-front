import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {APP_NAME} from "../../lang";
import logo from '../../media/image/robot5.svg';

class TopBar extends React.PureComponent {

    render() {
        const {contentWidth, isSmall} = this.props.screen;
        return <div className={styles.topBar}>
            <div className={styles.topBarContent} style={{width: contentWidth}}>
                <div className={styles.topBarContentValue} style={{fontSize: isSmall ? 24 : 48}}>{APP_NAME[window.activeLang]}</div>
                <img src={logo} height={isSmall ? 80 : 140}/>
            </div>
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(TopBar);
