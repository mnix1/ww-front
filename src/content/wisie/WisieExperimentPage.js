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

class WisieExperimentPage extends React.PureComponent {

    render() {
        const {profile, onExperimentClick, profileWisieListRep} = this.props;
        if (!isRepFulfilled(profileWisieListRep)) {
            return null;
        }
        const cost = experimentCost(profile, profileWisieListRep.value.length);
        return <div className={`inlineBlock ${INTRO_STEP_EXPERIMENT}`}>
            <div onClick={cost.isEnoughResource ? onExperimentClick : null}
                 className={`'justifyCenter flexColumn boxShadow marginRem pointer ${maybeDisabledClassName(!cost.isEnoughResource)}`}>
                <div className='justifyCenter paddingRem'>{getText(TEXT_EXPERIMENT)}</div>
                <div className='justifyCenter'><img alt='' src={experiment} height={60}/></div>
                <div className='justifyCenter'>
                    <div className='justifyCenter flexColumn paddingRem'>{getText(TEXT_COST)}:</div>
                    <Crystal notEnough={profile.crystal < cost.crystal}
                             size={RESOURCE_VERY_SMALL}>{cost.crystal}</Crystal>
                    <Wisdom notEnough={profile.wisdom < cost.wisdom}
                            size={RESOURCE_VERY_SMALL}>{cost.wisdom}</Wisdom>
                    <Elixir notEnough={profile.elixir < cost.elixir}
                            size={RESOURCE_VERY_SMALL}>{cost.elixir}</Elixir>
                </div>
            </div>
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        profileWisieListRep: state.repository.profileWisieList,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onExperimentClick: () => dispatch(experimentChanged(true))
    })
)(WisieExperimentPage);
