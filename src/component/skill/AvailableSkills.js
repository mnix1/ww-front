import React from 'react';
import PropTypes from "prop-types";
import {getSkill, SKILL_HINT} from "../../util/skillHelper";
import Skill from "./Skill";
import _ from "lodash";
import connect from "react-redux/es/connect/connect";

class AvailableSkills extends React.PureComponent {

    static propTypes = {
        disabled: PropTypes.bool,
        skills: PropTypes.object,
        className: PropTypes.string,
        onClick: PropTypes.func,
        groupCount: PropTypes.number,
        screen: PropTypes.object,
        skillClickHandlers: PropTypes.object,
    };

    static defaultProps = {
        skillClickHandlers: {},
        disabled: false,
        onClick: _.noop,
        skills: {},
        className: 'justifyCenter',
    };

    handleSkillClick(skill) {
        const {onClick, skillClickHandlers} = this.props;
        if (_.isFunction(skillClickHandlers[skill])) {
            skillClickHandlers[skill]();
        }
        onClick(skill);
    }

    renderSkill = (key) => {
        const {skills, disabled, screen} = this.props;
        return <Skill
            key={key}
            imgHeight={Math.min(Math.max(screen.standardImgHeight / 2, 25), 40)}
            disabled={(disabled && key !== SKILL_HINT) || !skills[key].canUse}
            used={skills[key].used}
            onClick={() => this.handleSkillClick(key)}
            imgSrc={getSkill(key)}>{skills[key].count}
        </Skill>;
    };

    renderGroups(keys, groupCount) {
        if (keys.length < groupCount) {
            return this.renderOneRow(keys);
        }
        const groups = _.chunk(keys, groupCount);
        return <div className='justifyCenter flexColumn'>
            {groups.map(e => this.renderOneRow(e))}
        </div>
    }

    renderOneRow(keys) {
        return <div key={keys[0]} className='justifyStart'>{keys.map(this.renderSkill)}</div>
    }

    render() {
        const {skills, className, groupCount} = this.props;
        if (_.isEmpty(skills)) {
            return null;
        }
        const keys = _.sortBy(_.keys(skills), key => skills[key].type + key);
        return <div className={className}>
            {_.isNil(groupCount) ? this.renderOneRow(keys) : this.renderGroups(keys, groupCount)}
        </div>
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(AvailableSkills);

