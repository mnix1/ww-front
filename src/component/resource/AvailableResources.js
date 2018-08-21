import React from 'react';
import {connect} from 'react-redux';
import '../../content/profile/styles.css';
import {getText, TEXT_AVAILABLE_RESOURCES} from "../../lang";
import Gold from "../../component/resource/Gold";
import Crystal from "../../component/resource/Crystal";
import Elixir from "../../component/resource/Elixir";
import Wisdom from "../../component/resource/Wisdom";
import {RESOURCE_BIG} from "../../component/resource/Resource";

class AvailableResources extends React.PureComponent {
    render() {
        const {profile} = this.props;
        return <div className='contentFragment textAlignCenter availableResources'>
            <div className='title'>{getText(TEXT_AVAILABLE_RESOURCES)} </div>
            <div className='resources justifyEvenly'>
                <Gold size={RESOURCE_BIG}>{profile.gold}</Gold>
                <Crystal size={RESOURCE_BIG}>{profile.crystal}</Crystal>
                <Wisdom size={RESOURCE_BIG}>{profile.wisdom}</Wisdom>
                <Elixir size={RESOURCE_BIG}>{profile.elixir}</Elixir>
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
