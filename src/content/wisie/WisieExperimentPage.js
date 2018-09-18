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

class WisieExperimentPage extends React.PureComponent {

    render() {
        const {profile, onExperimentClick} = this.props;
        const cost = 100;
        const isEnoughResource = profile.crystal >= cost && profile.wisdom >= cost && profile.elixir >= cost;
        return <div className={`inlineBlock ${INTRO_STEP_EXPERIMENT}`}>
            <div onClick={isEnoughResource ? onExperimentClick : null}
                 className={`'justifyCenter flexColumn boxShadow marginRem pointer ${maybeDisabledClassName(!isEnoughResource)}`}>
                <div className='justifyCenter paddingRem'>{getText(TEXT_EXPERIMENT)}</div>
                <div className='justifyCenter'><img alt='' src={experiment} height={60}/></div>
                <div className='justifyCenter paddingRem'>
                    <div className='justifyCenter flexColumn paddingRem'>{getText(TEXT_COST)}:</div>
                    <Crystal notEnough={profile.crystal < cost} size={RESOURCE_VERY_SMALL}>{cost}</Crystal>
                    <Wisdom notEnough={profile.wisdom < cost} size={RESOURCE_VERY_SMALL}>{cost}</Wisdom>
                    <Elixir notEnough={profile.elixir < cost} size={RESOURCE_VERY_SMALL}>{cost}</Elixir>
                </div>
            </div>
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onExperimentClick: () => dispatch(experimentChanged(true))
    })
)(WisieExperimentPage);
