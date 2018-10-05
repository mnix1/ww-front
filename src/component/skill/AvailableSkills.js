import React from 'react';
import PropTypes from "prop-types";
import {getSkill} from "../../util/skillHelper";
import Skill from "./Skill";
import _ from "lodash";

export default class AvailableSkills extends React.PureComponent {

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
        const {skills, className, disabled} = this.props;
        const keys = _.sortBy(_.keys(skills));
        return <div className={className}>
            <div className='justifyCenter'>
                {keys.map(e => <Skill
                    disabled={disabled || !skills[e].canUse}
                    used={skills[e].used}
                    onClick={() => this.handleSkillClick(e)} key={e}
                    imgSrc={getSkill(e)}>{skills[e].count}
                </Skill>)}
            </div>
        </div>
    }
}
