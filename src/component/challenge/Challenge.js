import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {TiArrowForward, TiLockClosed, TiLockOpen} from "react-icons/ti";
import {MdContactMail, MdFilter1, MdFilter9Plus} from "react-icons/md";
import {FaGavel, FaListOl} from "react-icons/fa";
import {CHALLENGE_ACCESS_INVITE, CHALLENGE_ACCESS_LOCK, CHALLENGE_APPROACH_ONE} from "../../util/challengeHelper";
import {AvailableResourcesComponent} from "../resource/AvailableResources";
import {
    getText,
    TEXT_ACCESS,
    TEXT_APPROACHES,
    TEXT_CHALLENGE,
    TEXT_CHALLENGE_CLOSED,
    TEXT_CHALLENGE_JOIN_AND_NEXT_APPROACH_COST,
    TEXT_CHALLENGE_JOIN_COST,
    TEXT_CLOSE_DATE,
    TEXT_CREATION_DATE,
    TEXT_CREATOR,
    TEXT_FREE_ENTRY,
    TEXT_INVITES,
    TEXT_JOIN,
    TEXT_LOCK,
    TEXT_MANY,
    TEXT_NO_REWARDS,
    TEXT_ONE,
    TEXT_PARTICIPANTS,
    TEXT_PLAY,
    TEXT_POSSIBLE_APPROACHES,
    TEXT_PRIZE_POOL,
    TEXT_SUMMARY,
    TEXT_TIME_LEFT,
    TEXT_TRY_AGAIN,
    TEXT_UNLOCK
} from "../../lang/langText";
import {RESOURCE_VERY_SMALL} from "../resource/Resource";
import Timer from "../timer/Timer";
import {getWisor} from "../../util/wisorHelper";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../button/Button";

export default class Challenge extends React.PureComponent {

    state = {done: false};

    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        wisorType: PropTypes.string,
        access: PropTypes.string,
        approach: PropTypes.string,
        gain: PropTypes.object,
        cost: PropTypes.object,
        creationDate: PropTypes.string,
        closeDate: PropTypes.string,
        timeoutInterval: PropTypes.number,
        styleMargin: PropTypes.bool,
        stylePadding: PropTypes.bool,
        onJoinClick: PropTypes.func,
        onResponseClick: PropTypes.func,
        onSummaryClick: PropTypes.func,
        onTryAgainClick: PropTypes.func,
        renderAccess: PropTypes.bool,
        renderApproach: PropTypes.bool,
        renderCost: PropTypes.bool,
        renderGain: PropTypes.bool,
        renderTimeoutInterval: PropTypes.bool,
        renderCloseDate: PropTypes.bool,
        renderCreationDate: PropTypes.bool,
        renderCreator: PropTypes.bool,
        renderId: PropTypes.bool,
        enoughResources: PropTypes.bool
    };

    static defaultProps = {
        styleMargin: true,
        stylePadding: true,
        renderAccess: true,
        renderApproach: true,
        renderCost: true,
        renderGain: true,
        renderTimeoutInterval: true,
        renderCloseDate: false,
        renderCreationDate: true,
        renderCreator: true,
        renderId: true,
        enoughResources: true,
    };

    renderAccess() {
        const {access, renderAccess} = this.props;
        if (!renderAccess) {
            return null;
        }
        if (access === CHALLENGE_ACCESS_LOCK) {
            return <div className='justifyCenter'>{getText(TEXT_ACCESS)}: {getText(TEXT_LOCK)}
                <div className='justifyCenter flexColumn paddingLeftRem'><TiLockClosed/></div>
            </div>;
        } else if (access === CHALLENGE_ACCESS_INVITE) {
            return <div className='justifyCenter'>{getText(TEXT_ACCESS)}: {getText(TEXT_INVITES)}
                <div className='justifyCenter flexColumn paddingLeftRem'><MdContactMail/></div>
            </div>;
        }
        return <div className='justifyCenter'>{getText(TEXT_ACCESS)}: {getText(TEXT_UNLOCK)}
            <div className='justifyCenter flexColumn paddingLeftRem'><TiLockOpen/></div>
        </div>
    }

    renderApproach() {
        const {approach, renderApproach} = this.props;
        if (!renderApproach) {
            return null;
        }
        if (approach === CHALLENGE_APPROACH_ONE) {
            return <div className='justifyCenter'>{getText(TEXT_POSSIBLE_APPROACHES)}: {getText(TEXT_ONE)}
                <div className='justifyCenter flexColumn paddingLeftRem'><MdFilter1/></div>
            </div>;
        }
        return <div className='justifyCenter'>{getText(TEXT_POSSIBLE_APPROACHES)}: {getText(TEXT_MANY)}
            <div className='justifyCenter flexColumn paddingLeftRem'><MdFilter9Plus/></div>
        </div>
    }

    renderTimeoutInterval() {
        const {timeoutInterval, renderTimeoutInterval} = this.props;
        if (!renderTimeoutInterval) {
            return null;
        }
        if (this.state.done) {
            return <div className='justifyCenter'>{getText(TEXT_CHALLENGE_CLOSED)}</div>
        }
        return <div className='justifyCenter'>
            <div className='paddingRightRem'>{getText(TEXT_TIME_LEFT)}:</div>
            <Timer onDone={() => this.setState({done: true})} from={timeoutInterval} showChart={false}
                   showNumber={true}/>
        </div>
    }

    renderCreationDate() {
        const {creationDate, renderCreationDate} = this.props;
        if (!renderCreationDate) {
            return null;
        }
        return <div className='justifyCenter'>
            <div className='paddingRightRem'>{getText(TEXT_CREATION_DATE)}:</div>
            {new Date(creationDate).toLocaleString()}
        </div>
    }

    renderClosedDate() {
        const {closeDate, renderCloseDate} = this.props;
        if (!renderCloseDate) {
            return null;
        }
        return <div className='justifyCenter'>
            <div className='paddingRightRem'>{getText(TEXT_CLOSE_DATE)}:</div>
            {new Date(closeDate).toLocaleString()}
        </div>
    }

    renderCost() {
        const {cost, approach, renderCost, enoughResources} = this.props;
        if (!renderCost) {
            return null;
        }
        return cost.empty
            ? <div className='justifyCenter'>{getText(TEXT_FREE_ENTRY)}</div>
            : <div className='justifyCenter'>
                <div
                    className='marginRightRem justifyCenter flexColumn'>{getText(approach === CHALLENGE_APPROACH_ONE ? TEXT_CHALLENGE_JOIN_COST : TEXT_CHALLENGE_JOIN_AND_NEXT_APPROACH_COST)}:
                </div>
                <AvailableResourcesComponent
                    notEnough={!enoughResources}
                    column={false}
                    autoHide0={true}
                    size={RESOURCE_VERY_SMALL}
                    styleMargin={false}
                    stylePadding={false}
                    styleBoxShadow={false}
                    renderTitle={false}
                    {...cost}
                /></div>
    }

    renderGain() {
        const {gain, renderGain} = this.props;
        if (!renderGain) {
            return null;
        }
        return gain.empty
            ? <div className='justifyCenter'>{getText(TEXT_NO_REWARDS)}</div>
            : <div className='justifyCenter'>
                <div className='marginRightRem justifyCenter flexColumn'>{getText(TEXT_PRIZE_POOL)}:</div>
                <AvailableResourcesComponent
                    column={false}
                    autoHide0={true}
                    size={RESOURCE_VERY_SMALL}
                    styleMargin={false}
                    stylePadding={false}
                    styleBoxShadow={false}
                    renderTitle={false}
                    {...gain}
                /></div>
    }

    renderWisor() {
        const {wisorType, renderCreator} = this.props;
        if (!renderCreator) {
            return null;
        }
        return <div>
            <img draggable="false" alt='' src={getWisor(wisorType)} height={80}/>
        </div>
    }

    renderParticipants() {
        const {participants, approach} = this.props;
        return <div>
            {getText(approach === CHALLENGE_APPROACH_ONE ? TEXT_PARTICIPANTS : TEXT_APPROACHES)}: {participants}
        </div>
    }

    renderActions() {
        const {onJoinClick, onResponseClick, onTryAgainClick, onSummaryClick, enoughResources} = this.props;
        const {done} = this.state;
        return <div>
            {onJoinClick && !done &&
            <Button disabled={!enoughResources} className='marginLeftRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onJoinClick}
                    icon={<TiArrowForward/>}>{getText(TEXT_JOIN)}</Button>}
            {onResponseClick && !done &&
            <Button className='marginLeftRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onResponseClick}
                    icon={<FaGavel/>}>{getText(TEXT_PLAY)}</Button>}
            {onTryAgainClick && !done &&
            <Button disabled={!enoughResources} className='marginLeftRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onTryAgainClick}
                    icon={<FaGavel/>}>{getText(TEXT_TRY_AGAIN)}</Button>}
            {onSummaryClick &&
            <Button className='marginLeftRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onSummaryClick}
                    icon={<FaListOl/>}>{getText(TEXT_SUMMARY)}</Button>}
        </div>
    }

    render() {
        const {name, id, styleMargin, stylePadding, className, renderCreator, renderId} = this.props;
        const customClassName = cn('justifyCenter relative flexColumn boxShadow fontSize08Rem', {
            [className]: className,
            'marginRem': styleMargin,
            'paddingRem': stylePadding,
        });
        return <div className={customClassName}>
            <div className='blackBackground absoluteBackgroundMix'/>
            <div className='relative'>
                {renderId && <div className='justifyCenter'>{getText(TEXT_CHALLENGE)}: {id}</div>}
                {renderCreator && <div className='justifyCenter'>{getText(TEXT_CREATOR)}: {name}</div>}
                <div className='justifyCenter'>{this.renderWisor()}</div>
                <div className='justifyCenter'>{this.renderAccess()}</div>
                <div className='justifyCenter'>{this.renderApproach()}</div>
                <div className='justifyCenter'>{this.renderCreationDate()}</div>
                <div className='justifyCenter'>{this.renderClosedDate()}</div>
                <div className='justifyCenter'>{this.renderTimeoutInterval()}</div>
                <div className='justifyCenter'>{this.renderParticipants()}</div>
                <div className='justifyCenter'>{this.renderGain()}</div>
                <div className='justifyCenter'>{this.renderCost()}</div>
                <div className='justifyCenter marginTopRem fontSize08Rem'>{this.renderActions()}</div>
            </div>
        </div>;
    }
}