import React from 'react';
import './styles.css';
import {getBook} from "../../util/bookHelper";
import {
    getName,
    getText, TEXT_BUY,
    TEXT_CLAIM_REWARD,
    TEXT_DISCARD,
    TEXT_READ, TEXT_READ_FINISHED, TEXT_READ_NOW,
    TEXT_STOP_READING,
    TEXT_TIME_LEFT
} from "../../lang/langText";
import Crystal from "../../component/resource/Crystal";
import Timer from "../../component/timer/Timer";
import Elixir from "../../component/resource/Elixir";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import GoBook from 'react-icons/lib/go/book';
import FaTrash from 'react-icons/lib/fa/trash';
import FaBook from 'react-icons/lib/fa/book';
import MdAccessTime from 'react-icons/lib/md/access-time';
import Wisdom from "../resource/Wisdom";
import PropTypes from "prop-types";
import Rating from "../rating/Rating";
import {RESOURCE_VERY_SMALL} from "../resource/Resource";
import _ from 'lodash';

export default class ProfileBook extends React.PureComponent {

    static propTypes = {
        onReadingDone: PropTypes.func,
        onSpeedUpClick: PropTypes.func,
        onClaimRewardClick: PropTypes.func,
        onStartReadClick: PropTypes.func,
        onStopReadClick: PropTypes.func,
        onDiscardClick: PropTypes.func,
        canClaimReward: PropTypes.bool,
        isInProgress: PropTypes.bool,
        level: PropTypes.number,
        readTime: PropTypes.number,
        alreadyReadInterval: PropTypes.number,
        gainCrystal: PropTypes.number,
        gainWisdom: PropTypes.number,
        gainElixir: PropTypes.number,
        crystal: PropTypes.number,
        type: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {};

    state = {
        timerState: {}
    };

    calculateCrystalCost() {
        if (this.isFinished) {
            return null;
        }
        const {timerState} = this.state;
        const valueSeconds = _.defaultTo(timerState.valueSeconds, (this.leftReadInterval) / 1000);
        return Math.ceil(valueSeconds / 3600);
    }

    renderSpeedUpReading() {
        const {crystal, onSpeedUpClick} = this.props;
        const crystalCost = this.calculateCrystalCost();
        const isBuyEnable = crystal >= crystalCost;
        return <div className='justifyCenter fontSize08Rem paddingTopRem paddingBottomRem'>
            <Button disabled={!isBuyEnable} material={BUTTON_MATERIAL_BOX_SHADOW} icon={<MdAccessTime/>}
                    onClick={onSpeedUpClick}
            >
                <div className='justifyCenter'>
                    <Crystal size={RESOURCE_VERY_SMALL} margin={false} notEnough={!isBuyEnable}>{crystalCost}</Crystal>
                    <div className='justifyCenter flexColumn paddingLeftRem'>{getText(TEXT_READ_NOW)}</div>
                </div>
            </Button>
        </div>;
    }

    renderActions() {
        const {onClaimRewardClick, onStartReadClick, onStopReadClick, onDiscardClick, canClaimReward, isInProgress} = this.props;
        return <div className='bookActions fontSize08Rem paddingRem justifyEvenly paddingRem'>
            {!canClaimReward && !isInProgress &&
            <Button onClick={onStartReadClick} className='bookAction justifyBetween'
                    material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<GoBook/>}>{getText(TEXT_READ)}</Button>}
            {!canClaimReward && isInProgress &&
            <Button onClick={onStopReadClick} className='bookAction justifyBetween'
                    material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<GoBook/>}>{getText(TEXT_STOP_READING)}</Button>}
            {canClaimReward &&
            <Button onClick={onClaimRewardClick} className='bookAction justifyBetween'
                    material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<FaBook/>}>{getText(TEXT_CLAIM_REWARD)}</Button>}
            {!canClaimReward &&
            <Button onClick={onDiscardClick} className='bookAction justifyBetween' material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<FaTrash/>}>{getText(TEXT_DISCARD)}</Button>}
        </div>;
    }

    renderInfo() {
        const {level} = this.props;
        return <div className='bookInfo justifyBetween flexColumn'>
            <div className='justifyCenter'>{getName(this.props)}</div>
            <span className='justifyCenter'><Rating value={level / 2}/></span>
        </div>
    }

    get leftReadInterval() {
        const {readTime, alreadyReadInterval} = this.props;
        return readTime - alreadyReadInterval;
    }

    get isFinished() {
        return this.leftReadInterval <= 0;
    }

    renderDetails() {
        const {canClaimReward, onReadingDone, isInProgress, gainCrystal, gainWisdom, gainElixir, type} = this.props;
        const isFinished = this.isFinished;
        return <div className='bookDetails justifyCenter'>
            <img height={160} alt='' src={getBook(type)}/>
            <div className='bookDetailsInside justifyBetween flexColumn paddingRem'>
                <div className='justifyCenter flexColumn'>
                    <div className='justifyCenter'>{getText(isFinished ? TEXT_READ_FINISHED : TEXT_TIME_LEFT)}</div>
                    <div className='justifyCenter'>
                        <Timer
                            className={isFinished ? 'none' : ''}
                            onDone={onReadingDone}
                            onTick={(state) => this.setState({timerState: state})}
                            work={!isFinished && !canClaimReward && isInProgress}
                            showDigital={true}
                            showChart={false}
                            from={this.leftReadInterval}
                        />
                    </div>
                    {this.renderSpeedUpReading()}
                </div>
                <div className='bookGain justifyCenter'>
                    {gainCrystal > 0 && <Crystal>{gainCrystal}</Crystal>}
                    {gainWisdom > 0 && <Wisdom>{gainWisdom}</Wisdom>}
                    {gainElixir > 0 && <Elixir>{gainElixir}</Elixir>}
                </div>
            </div>
        </div>;
    }

    render() {
        const {style} = this.props;
        return <div className='bookContainer marginRem paddingRem boxShadow relative justifyCenter' style={style}>
            <div className='absoluteBackgroundMix'/>
            <div className='book relative justifyCenter flexColumn'>
                {this.renderInfo()}
                {this.renderDetails()}
                {this.renderActions()}
            </div>
        </div>;
    }
}