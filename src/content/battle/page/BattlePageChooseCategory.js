import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getText, TEXT_CHOOSE_CATEGORY} from "../../../lang";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../redux/reducer/battle";
import _ from 'lodash';
import {OBJECTS_CATEGORY} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import BattlePageIntro from "./BattlePageIntro";
import BattlePageProfiles from "./BattlePageProfiles";
import BattlePageTask from "./BattlePageTask";
import BattlePageHeader from "./BattlePageHeader";

class BattlePageChooseCategory extends React.PureComponent {

    render() {
        const {screen, communication} = this.props;
        return <div className='pageContent'>
            <div className="contentHeader">{getText(TEXT_CHOOSE_CATEGORY)}</div>
            <SimpleObjectGroup
                objects={OBJECTS_CATEGORY}
                onObjectClick={(id) => {
                    communication.send('BATTLE_CATEGORY' + JSON.stringify({id}))
                }}
                screen={screen}
            />
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        content: state.battle.content,
    }),
    (dispatch) => ({
    })
)(BattlePageChooseCategory);
