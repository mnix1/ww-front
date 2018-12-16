import React from 'react';
import ScreenPage from "../../component/page/ScreenPage";
import {getHelpLabel, WISIE_SKILL} from "../../lang/langHelp";
import connect from "react-redux/es/connect/connect";
import {getSkill, SKILLS} from "../../util/skillHelper";
import _ from 'lodash';
import {getSkillLabel} from "../../lang/langSkill";

class HelpPage extends React.PureComponent {
    renderTab(id) {
        const {lang} = this.props;
        return <div className='paddingRem marginRem boxShadow justifyCenter active'>{getHelpLabel(id, lang)}</div>
    }

    renderSkill(id) {
        return <div key={id} className='justifyCenter relative flexColumn marginRem paddingRem boxShadow'>
            <div className='absoluteBackgroundMix blackBackground'/>
            <div className='justifyCenter relative'><img height={80} draggable={false} alt='' src={getSkill(id)}/></div>
            <div className='textAlignCenter relative'>{getSkillLabel(id)}</div>
        </div>
    }

    render() {
        return <ScreenPage>
            <div className='justifyCenter'>
                {this.renderTab(WISIE_SKILL)}
            </div>
            <div className='justifyCenter flexWrap'>
                {_.map(SKILLS, (v, k) => this.renderSkill(k))}
            </div>
        </ScreenPage>
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
        lang: state.language.lang,
    }),
    (dispatch) => ({
        onRivalFriendClick: (tag, type) => {
        },
    })
)(HelpPage);
