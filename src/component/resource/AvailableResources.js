import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_AVAILABLE_RESOURCES} from "../../lang/langText";
import Gold from "../../component/resource/Gold";
import Crystal from "../../component/resource/Crystal";
import Elixir from "../../component/resource/Elixir";
import Wisdom from "../../component/resource/Wisdom";
import {RESOURCE_BIG} from "../../component/resource/Resource";
import PropTypes from "prop-types";

class AvailableResources extends React.PureComponent {
    static propTypes = {
        size: PropTypes.string,
        showGold: PropTypes.bool,
        showCrystal: PropTypes.bool,
        showElixir: PropTypes.bool,
        showWisdom: PropTypes.bool,
    };

    static defaultProps = {
        size: RESOURCE_BIG,
        showGold: true,
        showCrystal: true,
        showElixir: true,
        showWisdom: true,
    };

    render() {
        const {profile, size, showGold, showCrystal, showElixir, showWisdom} = this.props;
        return <div className='contentFragment textAlignCenter availableResources'>
            <div className='title'>{getText(TEXT_AVAILABLE_RESOURCES)} </div>
            <div className='resources justifyEvenly'>
                {showGold && <Gold size={size}>{profile.gold}</Gold>}
                {showCrystal && <Crystal size={size}>{profile.crystal}</Crystal>}
                {showElixir && <Wisdom size={size}>{profile.wisdom}</Wisdom>}
                {showWisdom && <Elixir size={size}>{profile.elixir}</Elixir>}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(AvailableResources);
