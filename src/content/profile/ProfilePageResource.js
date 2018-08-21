import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getText, TEXT_AVAILABLE_RESOURCES} from "../../lang";
import Gold from "../../component/resource/Gold";
import Crystal from "../../component/resource/Crystal";
import Elixir from "../../component/resource/Elixir";
import Wisdom from "../../component/resource/Wisdom";
import {RESOURCE_BIG} from "../../component/resource/Resource";

class ProfilePage extends React.PureComponent {
    render() {
        const {profile} = this.props;
        return <div className='contentFragment'>
            <div className='title'>{getText(TEXT_AVAILABLE_RESOURCES)} </div>
            <div className='resources'>
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
        screen: state.screen,
        profile: state.profile.profile,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({})
)(ProfilePage);
