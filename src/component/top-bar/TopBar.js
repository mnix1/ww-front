import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {MEDIUM_PADDING, TOP_BAR_HEIGHT} from "../../util/style/constant";
import {APP_NAME} from "../../lang";

class TopBar extends React.PureComponent {

    render() {
        const {contentWidth} = this.props.screen;
        return <div className={styles.topBar} style={{height: TOP_BAR_HEIGHT}}>
            <div className={styles.topBarContent} style={{width: contentWidth}}>
                    <span style={{
                        lineHeight: TOP_BAR_HEIGHT + 'px',
                        padding: MEDIUM_PADDING
                    }}>{APP_NAME[window.activeLang]}</span>
            </div>
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(TopBar);
