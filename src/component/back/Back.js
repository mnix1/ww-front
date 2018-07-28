import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import {idChanged} from "../../redux/reducer/content";
import {practiseCleared} from "../../redux/reducer/practise";
import {battleCleared} from "../../redux/reducer/battle";

class Back extends React.PureComponent {

    render() {
        const {onClick, screen} = this.props;
        const size = screen.isSmallHeight || screen.isSmallWidth
            ? 20
            : 30;
        return <div className={styles.back} onClick={onClick}>
            <MdArrowBack color="#fffdf1" size={size}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen
    }),
    (dispatch) => ({
        onClick: () => {
            dispatch(idChanged(undefined));
            dispatch(practiseCleared());
            dispatch(battleCleared());
        }
    })
)(Back);
