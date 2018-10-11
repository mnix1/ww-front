import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_AVAILABLE_RESOURCES} from "../../lang/langText";
import Gold from "../../component/resource/Gold";
import Crystal from "../../component/resource/Crystal";
import Elixir from "../../component/resource/Elixir";
import Wisdom from "../../component/resource/Wisdom";
import {RESOURCE_BIG} from "../../component/resource/Resource";
import PropTypes from "prop-types";

export class AvailableResourcesComponent extends React.PureComponent {
    static propTypes = {
        size: PropTypes.string,
        showGold: PropTypes.bool,
        showCrystal: PropTypes.bool,
        showElixir: PropTypes.bool,
        showWisdom: PropTypes.bool,
        gold: PropTypes.number,
        crystal: PropTypes.number,
        wisdom: PropTypes.number,
        elixir: PropTypes.number,
        renderTitle: PropTypes.bool,
        styleBoxShadow: PropTypes.bool
    };

    static defaultProps = {
        size: RESOURCE_BIG,
        renderTitle: true,
        showGold: true,
        showCrystal: true,
        showElixir: true,
        showWisdom: true,
    };

    render() {
        const {gold, crystal, wisdom, elixir, showGold, showCrystal, showElixir, showWisdom, renderTitle} = this.props;
        return <div className='contentFragment textAlignCenter availableResources'>
            {renderTitle && <div className='title'>{getText(TEXT_AVAILABLE_RESOURCES)} </div>}
            <div className='resources justifyEvenly'>
                {showGold && <Gold {...this.props}>{gold}</Gold>}
                {showCrystal && <Crystal {...this.props}>{crystal}</Crystal>}
                {showElixir && <Wisdom {...this.props}>{wisdom}</Wisdom>}
                {showWisdom && <Elixir {...this.props}>{elixir}</Elixir>}
            </div>
        </div>
    }
}

export default connect(
    (state) => state.profile.profile,
    (dispatch) => ({})
)(AvailableResourcesComponent);
