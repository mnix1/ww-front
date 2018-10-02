import React from 'react';
import Skill from "./Skill";
import {getSkill, SKILL_WATER_PISTOL} from "../../util/skillHelper";


export default class SkillWaterPistol extends React.PureComponent {

    render() {
        return <Skill imgSrc={getSkill(SKILL_WATER_PISTOL)} {...this.props}/>;
    }
}