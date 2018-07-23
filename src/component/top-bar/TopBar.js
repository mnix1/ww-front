import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import robo from '../../media/image/heroes/robo.svg';
import szeryf from '../../media/image/heroes/szeryf.svg';
import kitek from '../../media/image/heroes/kitek.svg';
import rumcia from '../../media/image/heroes/rumcia.svg';
import zarowa from '../../media/image/heroes/zarowa.svg';
import {getText, TEXT_APP_NAME} from "../../lang";

class TopBar extends React.PureComponent {

    render() {
        const {contentWidth, isSmall} = this.props.screen;
        return <div className={styles.topBar}>
            <div className={styles.topBarContent} style={{width: contentWidth}}>
                <div className={styles.topBarContentValue} style={{fontSize: isSmall ? 24 : 48}}>{getText(TEXT_APP_NAME)}</div>
                <img src={robo} height={isSmall ? 80 : 140}/>
                {/*<img src={szeryf} height={isSmall ? 80 : 140}/>*/}
                {/*<img src={kitek} height={isSmall ? 80 : 140}/>*/}
                {/*<img src={zarowa} height={isSmall ? 80 : 140}/>*/}
                {/*<img src={rumcia} height={isSmall ? 70 : 120}/>*/}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(TopBar);
