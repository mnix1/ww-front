import React from 'react';
import {connect} from 'react-redux';
import {Anime} from "../../../component/anime/Anime";
import {getText, TEXT_DRAW_CATEGORY, TEXT_DRAW_DIFFICULT, TEXT_DRAW_WHO_ANSWER} from "../../../lang/text";
import {OBJECTS_CATEGORY} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import {CATEGORY_RANDOM} from "../../../util/categoryHelper";
import _ from 'lodash';
import Rating from "../../../component/rating/Rating";
import {DIFFICULTY_LEVELS, NAME_TO_DIFFICULT_LEVEL} from "../../../util/difficultyHelper";
import Team from "./Team";

class RandomTeamHero extends React.PureComponent {

    renderRandomHero() {
        const ids = [0, 1, 2, 3, 4];
        const {screen, profile, team, targetId, delay, duration} = this.props;
        const targetSelectedIdValue = ids.length * 7;
        return <Anime
            targetAsChildProp={null}
            targetTransformer={(t) => ({activeId: targetSelectedIdValue <= t.activeId ? targetId : ids[Math.floor((t.activeId) % ids.length)]})}
            from={{activeId: 0}}
            to={{activeId: {value: targetSelectedIdValue * 1.5, duration: duration, delay: delay}}}>
            <Team
                profile={profile}
                team={team}
                screen={{...screen, contentHeight: screen.contentHeight - 70}}
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

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(RandomTeamHero);
