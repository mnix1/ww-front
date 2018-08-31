import React from 'react';
import './styles.css';
import {getBook} from "../../util/bookHelper";
import {getName, getText, TEXT_BUY} from "../../lang/langText";
import Crystal from "../../component/resource/Crystal";
import Timer from "../../component/timer/Timer";
import Elixir from "../../component/resource/Elixir";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import Wisdom from "../resource/Wisdom";
import PropTypes from "prop-types";
import Gold from "../resource/Gold";
import Rating from "../rating/Rating";
import _ from "lodash";
import {maybeDisabledStyle} from "../../util/style/constant";

export default class ProfileBook extends React.PureComponent {

    static propTypes = {
        isBuyEnable: PropTypes.bool,
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
        const {canBuyByGold, isBuyEnable, goldCost, canBuyByCrystal, crystalCost} = this.props;
        return <div className='justifyCenter'>
            {canBuyByGold && <Gold notEnough={!isBuyEnable}>{goldCost}</Gold>}
            {canBuyByCrystal && <Crystal notEnough={!isBuyEnable}>{crystalCost}</Crystal>}
            <div className='justifyCenter flexColumn'>{getText(TEXT_BUY)}</div>
        </div>;
    }

    renderActions() {
        const {onBuyClick, isBuyEnable} = this.props;
        return <div className='bookActions paddingRem justifyEvenly paddingRem'>
            <Button style={maybeDisabledStyle(!isBuyEnable)} onClick={isBuyEnable ? onBuyClick : _.noop}
                    className='bookAction justifyBetween'
                    material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<FaShoppingCart/>}>{this.renderBuyButtonContent()}</Button>
        </div>;
    }

    renderInfo() {
        const {level, readTime} = this.props;
        return <div className='bookInfo justifyBetween flexColumn'>
            <div className='justifyCenter'>{getName(this.props)}</div>
            <div className='justifyCenter'><Rating value={level / 2}/>
                <div className='justifyCenter flexColumn marginRem'>
                    <div className='justifyCenter'>
                        (<Timer work={false}
                                digitalFillHours0={false}
                                digitalMinutes={false}
                                digitalSeconds={false}
                                showChart={false}
                                showDigital={true}
                                from={readTime}
                    />)
                    </div>
                </div>
            </div>
        </div>
    }

    renderDetails() {
        const {gainCrystal, gainWisdom, gainElixir, type} = this.props;
        return <div className='bookDetails justifyBetween'>
            <img height={110} alt='' src={getBook(type)}/>
            <div className='bookDetailsInside relative justifyBetween flexColumn paddingRem'>
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