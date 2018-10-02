import React from 'react';
import Skill from "./Skill";
import {getSkill, SKILL_HINT} from "../../util/skillHelper";


export default class SkillHint extends React.PureComponent {

    render() {
        return <Skill imgSrc={getSkill(SKILL_HINT)} {...this.props}/>;
    }
}