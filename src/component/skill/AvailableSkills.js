import React from 'react';
import PropTypes from "prop-types";
import {getSkill} from "../../util/skillHelper";
import Skill from "./Skill";
import _ from "lodash";

export default class AvailableSkills extends React.PureComponent {

    static propTypes = {
        skills: PropTypes.object,
    };

    static defaultProps = {
        skills: {}
    };

    render() {
        const {skills} = this.props;
        return <div className='justifyCenter'>
            <div className='justifyCenter'>
                {_.map(skills, (v, k) => <Skill key={k} imgSrc={getSkill(k)}>{v}</Skill>)}
            </div>
        </div>
    }
}
