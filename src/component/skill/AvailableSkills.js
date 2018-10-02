import React from 'react';
import PropTypes from "prop-types";
import {getSkill} from "../../util/skillHelper";
import Skill from "./Skill";

export default class AvailableSkills extends React.PureComponent {

    static propTypes = {
        skills: PropTypes.array,
    };

    static defaultProps = {
        skills: []
    };

    render() {
        const {skills} = this.props;
        return <div className='justifyCenter'>
            <div className='justifyCenter'>
                {skills.map(e => <Skill imgSrc={getSkill(e.type)}>{e.count}</Skill>)}
            </div>
        </div>
    }
}
