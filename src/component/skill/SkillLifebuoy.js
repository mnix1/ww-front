import React from 'react';
import Skill from "./Skill";
import {getSkill, SKILL_LIFEBUOY} from "../../util/skillHelper";


export default class SkillLifebuoy extends React.PureComponent {

    render() {
        return <Skill imgSrc={getSkill(SKILL_LIFEBUOY)} {...this.props}/>;
    }
}