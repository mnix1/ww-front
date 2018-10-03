import React from 'react';
import PropTypes from "prop-types";
import {getSkill} from "../../util/skillHelper";
import Skill from "./Skill";
import _ from "lodash";

export default class AvailableSkills extends React.PureComponent {

    static propTypes = {
        skills: PropTypes.object,
        className: PropTypes.string,
    };

    static defaultProps = {
        skills: {},
        className: 'justifyCenter',
    };

    render() {
        const {skills, className} = this.props;
        const keys = _.sortBy(_.keys(skills));
        return <div className={className}>
            <div className='justifyCenter'>
                {keys.map(e => <Skill key={e} imgSrc={getSkill(e)}>{skills[e]}</Skill>)}
            </div>
        </div>
    }
}
