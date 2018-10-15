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
        styleBoxShadow: PropTypes.bool,
        autoHide0: PropTypes.bool,
        customTitle: PropTypes.string
    };

    static defaultProps = {
        size: RESOURCE_BIG,
        styleBoxShadow: true,
        stylePadding: true,
        renderTitle: true,
        showGold: true,
        showCrystal: true,
        showElixir: true,
        showWisdom: true,
        autoHide0: false,
    };

    render() {
        const {gold, crystal, wisdom, elixir, showGold, showCrystal, showElixir, showWisdom, renderTitle, autoHide0, customTitle} = this.props;
        return <div className='contentFragment textAlignCenter availableResources'>
            {renderTitle &&
            (customTitle ? customTitle : <div className='title'>{getText(TEXT_AVAILABLE_RESOURCES)}</div>)}
            <div className='resources justifyEvenly'>
                {showGold && (!autoHide0 || (autoHide0 && gold > 0)) && <Gold {...this.props}>{gold}</Gold>}
                {showCrystal && (!autoHide0 || (autoHide0 && crystal > 0)) &&
                <Crystal {...this.props}>{crystal}</Crystal>}
                {showElixir && (!autoHide0 || (autoHide0 && wisdom > 0)) && <Wisdom {...this.props}>{wisdom}</Wisdom>}
                {showWisdom && (!autoHide0 || (autoHide0 && elixir > 0)) && <Elixir {...this.props}>{elixir}</Elixir>}
            </div>
        </div>
    }
}

export default connect(
    (state) => state.profile.profile,
    (dispatch) => ({})
)(AvailableResourcesComponent);
