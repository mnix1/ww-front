import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import {idChanged} from "../../redux/reducer/content";
import {practiseCleared} from "../../redux/reducer/practise";
import {challengeCleared} from "../../redux/reducer/challenge";
import {BATTLE_STATUS_IN_PROGRESS} from "../../util/battleHelper";
import back from "../../media/image/icon/back.svg";

class Back extends React.PureComponent {

    render() {
        const {onClick, screen, battleInProgress} = this.props;
        if (battleInProgress) {
            return null
        }
        const size = screen.isSmallHeight || screen.isSmallWidth
            ? 20
            : 30;
        return <div className={styles.back} onClick={onClick}>
            <img src={back} height={size} style={{padding: '0.25rem'}}/>
            {/*<MdArrowBack color="#fffdf1" size={size}/>*/}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        battleInProgress: state.battle.status === BATTLE_STATUS_IN_PROGRESS
    }),
    (dispatch) => ({
        onClick: () => {
            dispatch(idChanged(undefined));
            dispatch(practiseCleared());
            dispatch(challengeCleared());
        }
    })
)(Back);
