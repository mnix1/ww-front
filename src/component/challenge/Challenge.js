import React from 'react';
import './styles.css';
import {getHero} from "../../util/media/HeroHelper";
import PropTypes from "prop-types";


export default class Challenge extends React.PureComponent {

    static propTypes = {
        challenge: PropTypes.object,
        actions: PropTypes.node,
        children: PropTypes.node,
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    render() {
        const {challenge} = this.props;
        const creator = challenge.creatorProfile;
        const date = new Date(challenge.inProgressDate);
        return <div key={creator.tag} className='challengeContainer'>
            <div className='inProgressDate'>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</div>
            <div className='challenge'>
                <img alt='' src={getHero(creator.avatar)} height={80}/>
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
