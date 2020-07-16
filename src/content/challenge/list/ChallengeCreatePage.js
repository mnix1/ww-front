import React from 'react';
import connect from "react-redux/es/connect/connect";
import ScreenPage from "../../../component/page/ScreenPage";
import {
    getText,
    TEXT_ACCESS,
    TEXT_CHALLENGE_JOIN_COST,
    TEXT_CREATE,
    TEXT_CREATE_CHALLENGE,
    TEXT_DURATION,
    TEXT_INVITES,
    TEXT_LOCK,
    TEXT_MANY,
    TEXT_ONE,
    TEXT_POSSIBLE_APPROACHES,
    TEXT_UNLOCK
} from "../../../lang/langText";
import {Button, BUTTON_MATERIAL_ACCEPT} from "../../../component/button/Button";
import {IoMdCreate} from "react-icons/io";
import {TiLockClosed, TiLockOpen} from "react-icons/ti";
import {MdContactMail, MdFilter1, MdFilter9Plus} from "react-icons/md";
import {
    CHALLENGE_ACCESS_INVITE,
    CHALLENGE_ACCESS_LOCK,
    CHALLENGE_ACCESS_UNLOCK,
    CHALLENGE_APPROACH_MANY,
    CHALLENGE_APPROACH_ONE,
    CHALLENGE_DURATION_24,
    CHALLENGE_DURATION_4,
    CHALLENGE_DURATION_48,
    CHALLENGE_DURATION_8,
    CHALLENGE_RESOURCE_COST_0,
    CHALLENGE_RESOURCE_COST_2,
    CHALLENGE_RESOURCE_COST_4,
    CHALLENGE_RESOURCE_COST_6
} from "../../../util/challengeHelper";
import {
    accessChanged,
    approachChanged,
    durationChanged,
    initChanged,
    resourceCostChanged,
    resourceTypeChanged
} from "../../../redux/reducer/challenge";
import Gold from "../../../component/resource/Gold";
import {RESOURCE_CRYSTAL, RESOURCE_ELIXIR, RESOURCE_GOLD, RESOURCE_WISDOM} from "../../../util/resourceHelper";
import Crystal from "../../../component/resource/Crystal";
import Wisdom from "../../../component/resource/Wisdom";
import Elixir from "../../../component/resource/Elixir";
import ChallengeCreateFetch from "../fetch/ChallengeCreateFetch";

class ChallengeCreatePage extends React.PureComponent {

    renderContent() {
        return <div className='justifyCenter flexColumn'>
            <div className='marginRem justifyCenter paddingBottomRem'>{getText(TEXT_CREATE_CHALLENGE)}</div>
            {this.renderAccess()}
            {this.renderApproach()}
            {this.renderResourceCost()}
            {this.renderResourceType()}
            {this.renderDuration()}
            {this.renderCreateChallenge()}
        </div>;
    }

    renderDuration() {
        const {onDurationClick, challenge} = this.props;
        const {duration} = challenge;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>{getText(TEXT_DURATION)}</div>
            <div className='justifyCenter'>
                {this.renderItem(`${CHALLENGE_DURATION_4}h`,
                    undefined,
                    duration === CHALLENGE_DURATION_4,
                    () => onDurationClick(CHALLENGE_DURATION_4))}
                {this.renderItem(`${CHALLENGE_DURATION_8}h`,
                    undefined,
                    duration === CHALLENGE_DURATION_8,
                    () => onDurationClick(CHALLENGE_DURATION_8))}
                {this.renderItem(`${CHALLENGE_DURATION_24}h`,
                    undefined,
                    duration === CHALLENGE_DURATION_24,
                    () => onDurationClick(CHALLENGE_DURATION_24))}
                {this.renderItem(`${CHALLENGE_DURATION_48}h`,
                    undefined,
                    duration === CHALLENGE_DURATION_48,
                    () => onDurationClick(CHALLENGE_DURATION_48))}
            </div>
        </div>
    }

    renderResourceCost() {
        const {onResourceCostClick, challenge} = this.props;
        const {resourceCost} = challenge;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>{getText(TEXT_CHALLENGE_JOIN_COST)}</div>
            <div className='justifyCenter'>
                {this.renderItem(CHALLENGE_RESOURCE_COST_0,
                    undefined,
                    resourceCost === CHALLENGE_RESOURCE_COST_0,
                    () => onResourceCostClick(CHALLENGE_RESOURCE_COST_0))}
                {this.renderItem(CHALLENGE_RESOURCE_COST_2,
                    undefined,
                    resourceCost === CHALLENGE_RESOURCE_COST_2,
                    () => onResourceCostClick(CHALLENGE_RESOURCE_COST_2))}
                {this.renderItem(CHALLENGE_RESOURCE_COST_4,
                    undefined,
                    resourceCost === CHALLENGE_RESOURCE_COST_4,
                    () => onResourceCostClick(CHALLENGE_RESOURCE_COST_4))}
                {this.renderItem(CHALLENGE_RESOURCE_COST_6,
                    undefined,
                    resourceCost === CHALLENGE_RESOURCE_COST_6,
                    () => onResourceCostClick(CHALLENGE_RESOURCE_COST_6))}
            </div>
        </div>
    }

    renderResourceType() {
        const {onResourceTypeClick, challenge} = this.props;
        const {resourceType, resourceCost} = challenge;
        if (resourceCost === CHALLENGE_RESOURCE_COST_0) {
            return null;
        }
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>
                {this.renderItem(undefined,
                    <Gold>{resourceCost}</Gold>,
                    resourceType === RESOURCE_GOLD,
                    () => onResourceTypeClick(RESOURCE_GOLD))}
                {this.renderItem(undefined,
                    <Crystal>{resourceCost}</Crystal>,
                    resourceType === RESOURCE_CRYSTAL,
                    () => onResourceTypeClick(RESOURCE_CRYSTAL))}
                {this.renderItem(undefined,
                    <Wisdom>{resourceCost}</Wisdom>,
                    resourceType === RESOURCE_WISDOM,
                    () => onResourceTypeClick(RESOURCE_WISDOM))}
                {this.renderItem(undefined,
                    <Elixir>{resourceCost}</Elixir>,
                    resourceType === RESOURCE_ELIXIR,
                    () => onResourceTypeClick(RESOURCE_ELIXIR))}
            </div>
        </div>
    }

    renderAccess() {
        const {onAccessClick, challenge} = this.props;
        const {access} = challenge;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>{getText(TEXT_ACCESS)}</div>
            <div className='justifyCenter'>
                {this.renderItem(getText(TEXT_UNLOCK),
                    <TiLockOpen/>,
                    access === CHALLENGE_ACCESS_UNLOCK,
                    () => onAccessClick(CHALLENGE_ACCESS_UNLOCK))}
                {this.renderItem(getText(TEXT_LOCK),
                    <TiLockClosed/>,
                    access === CHALLENGE_ACCESS_LOCK,
                    () => onAccessClick(CHALLENGE_ACCESS_LOCK))}
                {this.renderItem(getText(TEXT_INVITES),
                    <MdContactMail/>,
                    access === CHALLENGE_ACCESS_INVITE,
                    () => onAccessClick(CHALLENGE_ACCESS_INVITE))}
            </div>
        </div>
    }

    renderApproach() {
        const {onApproachClick, challenge} = this.props;
        const {approach} = challenge;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>{getText(TEXT_POSSIBLE_APPROACHES)}</div>
            <div className='justifyCenter'>
                {this.renderItem(getText(TEXT_ONE),
                    <MdFilter1/>,
                    approach === CHALLENGE_APPROACH_ONE,
                    () => onApproachClick(CHALLENGE_APPROACH_ONE))}
                {this.renderItem(getText(TEXT_MANY),
                    <MdFilter9Plus/>,
                    approach === CHALLENGE_APPROACH_MANY,
                    () => onApproachClick(CHALLENGE_APPROACH_MANY))}
            </div>
        </div>
    }

    renderItem(text, icon, checked, onClick) {
        return <div className='paddingRem boxShadow marginRem justifyCenter pointer'
                    onClick={onClick}>
            <span className='paddingRightRem'>{text}</span>
            <div className='justifyCenter flexColumn paddingRightRem'>{icon}</div>
            <div className='justifyCenter flexColumn'>
                <input readOnly={true} className='pointer' type='radio' checked={checked}/>
            </div>
        </div>
    }

    renderCreateChallenge() {
        const {onCreateChallengeClick} = this.props;
        return <div className='justifyCenter marginRem relative'>
            <Button icon={<IoMdCreate/>}
                    onClick={onCreateChallengeClick}
                    material={BUTTON_MATERIAL_ACCEPT}>{getText(TEXT_CREATE)}</Button>
        </div>;
    }

    render() {
        const {path, challenge} = this.props;
        return <ScreenPage>
            {this.renderContent()}
            <ChallengeCreateFetch path={path} {...challenge}/>
        </ScreenPage>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        challenge: state.challenge,
    }),
    (dispatch) => ({
        onAccessClick: (access) => dispatch(accessChanged(access)),
        onApproachClick: (approach) => dispatch(approachChanged(approach)),
        onResourceCostClick: (resourceCost) => dispatch(resourceCostChanged(resourceCost)),
        onResourceTypeClick: (resourceType) => dispatch(resourceTypeChanged(resourceType)),
        onDurationClick: (duration) => dispatch(durationChanged(duration)),
        onCreateChallengeClick: () => dispatch(initChanged(true))
    })
)(ChallengeCreatePage);
