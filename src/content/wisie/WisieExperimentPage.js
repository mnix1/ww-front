import React from 'react';
import {connect} from 'react-redux';
import experiment from '../../media/image/icon/experiment.svg';
import {getText, TEXT_COST, TEXT_EXPERIMENT} from "../../lang/langText";
import Crystal from "../../component/resource/Crystal";
import Wisdom from "../../component/resource/Wisdom";
import Elixir from "../../component/resource/Elixir";
import {RESOURCE_VERY_SMALL} from "../../component/resource/Resource";
import {maybeDisabledClassName} from "../../util/style/constant";
import {experimentChanged} from "../../redux/reducer/wisie";
import {INTRO_STEP_EXPERIMENT} from "../intro/introHelper";
import {experimentCost} from "../../util/resourceHelper";
import {isRepFulfilled} from "../../util/repositoryHelper";
import {WISIES} from "../../util/wisieHelper";

class WisieExperimentPage extends React.PureComponent {

    render() {
        const {profile, onExperimentClick, profileWisieListRep, screen} = this.props;
        if (!isRepFulfilled(profileWisieListRep) || profileWisieListRep.value.length === WISIES.length) {
            return null;
        }
        const cost = experimentCost(profile, profileWisieListRep.value.length);
        return <div className={`inlineBlock ${INTRO_STEP_EXPERIMENT}`}>
            <div onClick={cost.isEnoughResource ? onExperimentClick : null}
                 className={`'justifyCenter flexColumn boxShadow marginRem pointer ${maybeDisabledClassName(!cost.isEnoughResource)}`}>
                <div className='justifyCenter paddingRem'>{getText(TEXT_EXPERIMENT)}</div>
                <div className='justifyCenter'><img draggable="false" alt='' src={experiment}
                                                    height={Math.min(60, screen.standardImgHeight)}/></div>
                <div className='justifyCenter'>
                    <div className='justifyCenter flexColumn paddingRem'>{getText(TEXT_COST)}:</div>
                    <Crystal notEnough={profile.resources.crystal < cost.crystal}
                             size={RESOURCE_VERY_SMALL}>{cost.crystal}</Crystal>
                    <Wisdom notEnough={profile.resources.wisdom < cost.wisdom}
                            size={RESOURCE_VERY_SMALL}>{cost.wisdom}</Wisdom>
                    <Elixir notEnough={profile.resources.elixir < cost.elixir}
                            size={RESOURCE_VERY_SMALL}>{cost.elixir}</Elixir>
                </div>
            </div>
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile,
        profileWisieListRep: state.repository.profileWisieList,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onExperimentClick: () => dispatch(experimentChanged(true))
    })
)(WisieExperimentPage);
