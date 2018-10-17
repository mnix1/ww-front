import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CHOOSE_WISIES} from "../../lang/langText";
import './styles.css';
import {WisieListPageComponent} from "./WisieListPage";
import cn from "classnames";
import Wisie from "../../component/wisie/Wisie";
import {pickWisiesChanged} from "../../redux/reducer/intro";
import _ from 'lodash';
import {PICK_WISIE_COUNT} from "../intro/introHelper";

class WisiePickPage extends WisieListPageComponent {

    renderOwned() {
        return null;
    }

    renderToogleShowNotOwned() {
        const {pickWisies} = this.props;
        return <div
            className='pageHeader'>{getText(TEXT_CHOOSE_WISIES)} ({pickWisies.length}/{PICK_WISIE_COUNT})</div>;
    }

    renderWisie(wisie) {
        const {onWisiePickClick, pickWisies, screen} = this.props;
        const className = cn('pointer');
        return <Wisie
            renderHobbies={false}
            active={_.includes(pickWisies, wisie.type)}
            blackBackground={true}
            imgHeight={screen.standardImgHeight + 20}
            key={wisie.type}
            style={{width: this.wisieWidth}} {...wisie}
            className={className}
            onClick={() => onWisiePickClick(pickWisies, wisie)}
        />;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        showNotOwned: true,
        pickWisies: state.intro.pickWisies,
        path: state.router.location.pathname,
        profileWisies: state.wisie.profileWisies,
        profileWisieListRep: state.repository.profileWisieList
    }),
    (dispatch) => ({
        onWisiePickClick: (pickWisies, wisie) => {
            const newPickWisies = _.includes(pickWisies, wisie.type)
                ? pickWisies.filter(e => e !== wisie.type)
                : pickWisies.length < PICK_WISIE_COUNT ? pickWisies.concat([wisie.type]) : pickWisies;
            dispatch(pickWisiesChanged(newPickWisies));
        }
    })
)(WisiePickPage);
