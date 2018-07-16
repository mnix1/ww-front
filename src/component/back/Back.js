import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import {idChanged} from "../../redux/reducer/content";
import {categoryChanged} from "../../redux/reducer/rival";

class Back extends React.PureComponent {

    render() {
        const {onClick} = this.props;
        return <div className={styles.back} onClick={onClick}>
            <MdArrowBack color="#fffdf1" size={30}/>
        </div>;
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        onClick: () => {
            dispatch(idChanged(undefined));
            dispatch(categoryChanged(undefined));
        }
    })
)(Back);
