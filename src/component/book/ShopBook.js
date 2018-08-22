import React from 'react';
import './styles.css';
import {getBook} from "../../util/bookHelper";
import {getName, getText, TEXT_BUY} from "../../lang";
import Crystal from "../../component/resource/Crystal";
import Timer from "../../component/timer/Timer";
import Elixir from "../../component/resource/Elixir";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import Wisdom from "../resource/Wisdom";
import PropTypes from "prop-types";
import Gold from "../resource/Gold";
import Rating from "../rating/Rating";

export default class ProfileBook extends React.PureComponent {

    static propTypes = {
        canBuyByGold: PropTypes.bool,
        level: PropTypes.number,
        gainCrystal: PropTypes.number,
        gainWisdom: PropTypes.number,
        gainElixir: PropTypes.number,
        goldCost: PropTypes.number,
        type: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {};

    renderBuyButtonContent() {
        const {canBuyByGold, goldCost, canBuyByCrystal, crystalCost} = this.props;
        return <div className='justifyCenter'>
            {canBuyByGold && <Gold>{goldCost}</Gold>}
            {canBuyByCrystal && <Crystal>{crystalCost}</Crystal>}
            <div className='justifyCenter flexColumn'>{getText(TEXT_BUY)}</div>
        </div>;
    }

    renderActions() {
        const {onBuyClick} = this.props;
        return <div className='bookActions'>
            <Button onClick={onBuyClick} className='bookAction' material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<FaShoppingCart/>}>{this.renderBuyButtonContent()}</Button>
        </div>;
    }

    renderInfo() {
        const {level} = this.props;
        return <div className='bookInfo flexColumn'>
            <div className='absoluteBackgroundMix'/>
            <div className='relative justifyCenter'>{getName(this.props)}</div>
            <span className='relative justifyCenter'><Rating value={level / 2}/></span>
        </div>
    }

    renderDetails() {
        const {canClaimReward, readTime, isInProgress, alreadyReadInterval, gainCrystal, gainWisdom, gainElixir, type} = this.props;
        return <div className='bookDetails'>
            <img height={110} alt='' src={getBook(type)}/>
            <div className='bookDetailsInside relative'>
                {!canClaimReward && isInProgress && <div className='justifyCenter'>
                    <Timer showClock={true}
                           showChart={false}
                           from={readTime - alreadyReadInterval}
                    />
                </div>}
                <div className='bookGain justifyBetween flexColumn height100'>
                    {gainCrystal > 0 && <Crystal>{gainCrystal}</Crystal>}
                    {gainWisdom > 0 && <Wisdom>{gainWisdom}</Wisdom>}
                    {gainElixir > 0 && <Elixir>{gainElixir}</Elixir>}
                </div>
            </div>
        </div>;
    }

    render() {
        const {style} = this.props;
        return <div className='bookContainer' style={style}>
            <div className='absoluteBackgroundMix'/>
            <div className='book'>
                {this.renderInfo()}
                {this.renderDetails()}
                {this.renderActions()}
            </div>
        </div>;
    }
}