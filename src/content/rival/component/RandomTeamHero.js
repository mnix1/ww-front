import React from 'react';
import {Anime} from "../../../component/anime/Anime";
import Team from "./Team";

export default class RandomTeamHero extends React.PureComponent {

    static defaultProps = {
        presentIndexes: []
    };

    renderRandomHero() {
        const {profile, team, targetIndex, presentIndexes, delay, duration} = this.props;
        const ids = presentIndexes;
        const targetSelectedIdValue = ids.length * 7;
        return <Anime
            targetAsChildProp={null}
            targetTransformer={(t) => ({activeIndex: targetSelectedIdValue <= t.activeIndex ? targetIndex : ids[Math.floor((t.activeIndex) % ids.length)]})}
            from={{activeIndex: 0}}
            to={{activeIndex: {value: targetSelectedIdValue * 1.5, duration: duration, delay: delay}}}>
            <Team
                profile={profile}
                presentIndexes={presentIndexes}
                team={team}
            />
        </Anime>;
    }

    render() {
        const {className} = this.props;
        return <div className={className}>
            {this.props.children}
            <div className='pageHeader'>
                {this.renderRandomHero()}
            </div>
        </div>;
    }
}
