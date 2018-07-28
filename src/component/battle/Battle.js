import React from 'react';
import './styles.css';
import {getHero} from "../../util/media/HeroHelper";
import PropTypes from "prop-types";


export default class Battle extends React.PureComponent {

    static propTypes = {
        battle: PropTypes.object,
        actions: PropTypes.node,
        children: PropTypes.node,
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    render() {
        const {battle} = this.props;
        const creator = battle.creatorProfile;
        const date = new Date(battle.inProgressDate);
        return <div key={creator.tag} className='battleContainer'>
            <div className='inProgressDate'>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</div>
            <div className='battle'>
                <img src={getHero(creator.avatar)} height={80}/>
                <div className='details'>
                    {this.renderActions()}
                    <div>
                        <div className='creatorName'>{creator.name}</div>
                        <div className='creatorTag'>#{creator.tag}</div>
                    </div>
                </div>
            </div>
        </div>
    }

}
