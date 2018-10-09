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

    render() {
        const {skills, className, disabled, screen} = this.props;
        const keys = _.sortBy(_.keys(skills), key => skills[key].type + key);
        return <div className={className}>
            <div className='justifyCenter'>
                {keys.map(e => <Skill
                    key={e}
                    imgHeight={screen.standardImgHeight / 2 - 5}
                    disabled={(disabled && e !== SKILL_HINT) || !skills[e].canUse}
                    used={skills[e].used}
                    onClick={() => this.handleSkillClick(e)}
                    imgSrc={getSkill(e)}>{skills[e].count}
                </Skill>)}
            </div>
        </div>
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(AvailableSkills);

