import React from 'react';
import './styles.css';
import {getBook} from "../../util/bookHelper";
import {getName, getText, TEXT_CLAIM_REWARD, TEXT_DISCARD, TEXT_READ, TEXT_STOP_READING} from "../../lang";
import {getLevelFromNumber, renderStars} from "../../util/starRateHelper";
import Crystal from "../../component/resource/Crystal";
import Timer from "../../component/timer/Timer";
import Elixir from "../../component/resource/Elixir";
import {
    Button,
    BUTTON_MATERIAL_ACCEPT,
    BUTTON_MATERIAL_DANGER,
    BUTTON_MATERIAL_NORMAL
} from "../../component/button/Button";
import GoBook from 'react-icons/lib/go/book';
import FaTrash from 'react-icons/lib/fa/trash';
import FaBook from 'react-icons/lib/fa/book';
import Wisdom from "../resource/Wisdom";
import PropTypes from "prop-types";
import {BUTTON_MATERIAL_WARNING} from "../button/Button";

export default class Book extends React.PureComponent {

    static propTypes = {
        onClaimRewardClick: PropTypes.func,
        onStartReadClick: PropTypes.func,
        onStopReadClick: PropTypes.func,
        onDiscardClick: PropTypes.func,
        book: PropTypes.object,
    };

    static defaultProps = {};

    renderActions() {
        const {onClaimRewardClick, onStartReadClick, onStopReadClick, onDiscardClick, canClaimReward, isInProgress} = this.props;
        return <div className='bookActions'>
            {!canClaimReward && !isInProgress &&
            <Button onClick={onStartReadClick} className='bookAction' material={BUTTON_MATERIAL_NORMAL}
                    icon={<GoBook size={20}/>}>{getText(TEXT_READ)}</Button>}
            {!canClaimReward && isInProgress &&
            <Button onClick={onStopReadClick} className='bookAction' material={BUTTON_MATERIAL_WARNING}
                    icon={<GoBook size={20}/>}>{getText(TEXT_STOP_READING)}</Button>}
            {canClaimReward &&
            <Button onClick={onClaimRewardClick} className='bookAction' material={BUTTON_MATERIAL_ACCEPT}
                    icon={<FaBook size={20}/>}>{getText(TEXT_CLAIM_REWARD)}</Button>}
            {!canClaimReward &&
            <Button onClick={onDiscardClick} className='bookAction' material={BUTTON_MATERIAL_DANGER}
                    icon={<FaTrash size={20}/>}>{getText(TEXT_DISCARD)}</Button>}
        </div>;
    }

    renderInfo() {
        const {level} = this.props;
        return <div className='bookInfo'>
            <div className='background'/>
            <div className='relative justifyCenter'>{getName(this.props)}</div>
            <span className='relative justifyCenter flexColumn'>{renderStars(getLevelFromNumber(level))}</span>
        </div>
    }

    renderDetails() {
        const {canClaimReward, readTime, isInProgress, alreadyReadInterval, gainCrystal, gainWisdom, gainElixir, type} = this.props;
        return <div className='bookDetails'>
            <img height={200} alt='' src={getBook(type)}/>
            <div className='bookDetailsInside'>
                {!canClaimReward && isInProgress && <div>
                    <Timer className='justifyCenter'
                           showClock={true}
                           showChart={false}
                           from={readTime - alreadyReadInterval}
                    />
                </div>}
                <div className='bookGain justifyCenter'>
                    {gainCrystal > 0 && <Crystal>{gainCrystal}</Crystal>}
                    {gainWisdom > 0 && <Wisdom>{gainWisdom}</Wisdom>}
                    {gainElixir > 0 && <Elixir>{gainElixir}</Elixir>}
                </div>
            </div>
        </div>;
    }

    render() {
        return <div className='bookContainer'>
            <div className='book'>
                {this.renderInfo()}
                {this.renderDetails()}
                {this.renderActions()}
            </div>
        </div>;
    }
}