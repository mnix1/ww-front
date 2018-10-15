import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {TiArrowForward, TiLockClosed, TiLockOpen} from "react-icons/ti";
import {MdContactMail} from "react-icons/md";
import {FaGavel, FaListOl} from "react-icons/fa";
import {CHALLENGE_ACCESS_INVITE, CHALLENGE_ACCESS_LOCK} from "../../util/challengeHelper";
import {AvailableResourcesComponent} from "../resource/AvailableResources";
import {
    getText,
    TEXT_ACCESS,
    TEXT_CHALLENGE,
    TEXT_CHALLENGE_JOIN_COST,
    TEXT_CLOSE_DATE,
    TEXT_CREATION_DATE,
    TEXT_CREATOR,
    TEXT_FREE_ENTRY,
    TEXT_INVITES,
    TEXT_JOIN,
    TEXT_LOCK,
    TEXT_NO_REWARDS,
    TEXT_PARTICIPANTS,
    TEXT_PLAY,
    TEXT_PRIZE_POOL,
    TEXT_SUMMARY,
    TEXT_TIME_LEFT,
    TEXT_UNLOCK
} from "../../lang/langText";
import {RESOURCE_VERY_SMALL} from "../resource/Resource";
import Timer from "../timer/Timer";
import {getWisor} from "../../util/wisorHelper";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../button/Button";

export default class Challenge extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string,
        access: PropTypes.string,
        gain: PropTypes.object,
        cost: PropTypes.object,
        styleMargin: PropTypes.bool,
        stylePadding: PropTypes.bool,
        onJoinClick: PropTypes.func,
        onResponseClick: PropTypes.func,
        onSummaryClick: PropTypes.func,
        renderAccess: PropTypes.bool,
        renderCost: PropTypes.bool,
        renderGain: PropTypes.bool,
        renderTimeoutInterval: PropTypes.bool,
        renderCloseDate: PropTypes.bool,
    };

    static defaultProps = {
        styleMargin: true,
        stylePadding: true,
        renderAccess: true,
        renderCost: true,
        renderGain: true,
        renderTimeoutInterval: true,
        renderCloseDate: false,
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

    renderTimeoutInterval() {
        const {timeoutInterval, renderTimeoutInterval} = this.props;
        if (!renderTimeoutInterval) {
            return null;
        }
        return <div className='justifyCenter'>
            <div className='paddingRightRem'>{getText(TEXT_TIME_LEFT)}:</div>
            <Timer from={timeoutInterval} showChart={false} showNumber={true}/>
        </div>
    }

    renderCreationDate() {
        const {creationDate} = this.props;
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
        const {cost, renderCost} = this.props;
        if (!renderCost) {
            return null;
        }
        return cost.empty
            ? <div className='justifyCenter'>{getText(TEXT_FREE_ENTRY)}</div>
            : <div className='justifyCenter'>
                <div className='marginRightRem justifyCenter flexColumn'>{getText(TEXT_CHALLENGE_JOIN_COST)}:</div>
                <AvailableResourcesComponent
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
        const {wisorType} = this.props;
        return <div>
            <img alt='' src={getWisor(wisorType)} height={80}/>
        </div>
    }

    renderParticipants() {
        const {participants} = this.props;
        return <div>
            {getText(TEXT_PARTICIPANTS)}: {participants}
        </div>
    }

    renderActions() {
        const {onJoinClick, onResponseClick, onSummaryClick} = this.props;
        return <div>
            {onJoinClick &&
            <Button className='marginLeftRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onJoinClick}
                    icon={<TiArrowForward/>}>{getText(TEXT_JOIN)}</Button>}
            {onResponseClick &&
            <Button className='marginLeftRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onResponseClick}
                    icon={<FaGavel/>}>{getText(TEXT_PLAY)}</Button>}
            {onSummaryClick &&
            <Button className='marginLeftRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onSummaryClick}
                    icon={<FaListOl/>}>{getText(TEXT_SUMMARY)}</Button>}
        </div>
    }

    render() {
        const {name, id, styleMargin, stylePadding, className} = this.props;
        const customClassName = cn('justifyCenter relative flexColumn boxShadow fontSize08Rem', {
            [className]: className,
            'marginRem': styleMargin,
            'paddingRem': stylePadding,
        });
        return <div className={customClassName}>
            <div className='blackBackground absoluteBackgroundMix'/>
            <div className='relative'>
                <div className='justifyCenter'>{getText(TEXT_CHALLENGE)}: {id}</div>
                <div className='justifyCenter'>{getText(TEXT_CREATOR)}: {name}</div>
                <div className='justifyCenter'>{this.renderWisor()}</div>
                <div className='justifyCenter'>{this.renderAccess()}</div>
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