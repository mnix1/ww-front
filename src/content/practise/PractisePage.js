import React from 'react';
import styles from './styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import {answerIdChanged, categoryChanged, skipAnimationChanged} from "../../redux/reducer/practise";
import Task from "../../component/task/Task";
import PractiseStartFetch, {clearPractiseStartFetch} from "./fetch/PractiseStartFetch";
import PractiseEndFetch, {clearPractiseEndFetch} from "./fetch/PractiseEndFetch";
import {randomHero} from "../../util/media/HeroHelper";
import {
    getText,
    TEXT_CHOOSE_CATEGORY,
    TEXT_CORRECT_ANSWER,
    TEXT_PLAY_AGAIN, TEXT_QUESTION,
    TEXT_TIME,
    TEXT_WRONG_ANSWER
} from "../../lang";
import {OBJECTS_CATEGORY} from "../object-group/objectsCategory";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";

class PractisePage extends React.PureComponent {

    randomHero = randomHero();

    renderContent() {
        const {category, practiseStartRep} = this.props;
        if (category === undefined) {
            return this.renderChooseCategory();
        }
        if (practiseStartRep && practiseStartRep.fulfilled) {
            return this.renderTask();
        }
        return null;
    }

    renderChooseCategory() {
        const {screen, onCategoryChange} = this.props;
        return <div>
            <div className="contentHeader">{getText(TEXT_CHOOSE_CATEGORY)}</div>
            <SimpleObjectGroup
                objects={OBJECTS_CATEGORY}
                onObjectClick={onCategoryChange}
                screen={screen}
            />
        </div>;
    }

    renderTask() {
        const {screen, practiseStartRep, practiseEndRep,skipAnimation, onSkipAnimationChange, answerId, onAnswerClick} = this.props;
        const correctAnswerId = _.get(practiseEndRep, 'value.correctAnswerId');
        return <div>
            {answerId && correctAnswerId && [this.renderResult(), this.renderPlayAgain()]}
            <Task key='task'
                  header={<div className="contentHeader">{getText(TEXT_QUESTION)}</div>}
                  screen={screen}
                  skipAnimation={skipAnimation}
                  onSkipAnimationChange={onSkipAnimationChange}
                  question={practiseStartRep.value.practise.question}
                  answers={practiseStartRep.value.practise.question.answers}
                  correctAnswerId={_.get(practiseEndRep, 'value.correctAnswerId')}
                  answerId={answerId}
                  onAnswerClick={onAnswerClick}/>
        </div>
    }

    renderResult() {
        const {answerId, practiseEndRep} = this.props;
        const correctAnswerId = _.get(practiseEndRep, 'value.correctAnswerId');
        if (!correctAnswerId) {
            return null;
        }
        const answerInterval = _.get(practiseEndRep, 'value.answerInterval');
        const answerIntervalMessage = `${getText(TEXT_TIME)}${(answerInterval / 1000).toFixed(1)} s`;
        const resultMessage = correctAnswerId === answerId ? getText(TEXT_CORRECT_ANSWER) : getText(TEXT_WRONG_ANSWER);
        return <div key='result' className="contentHeader">
            <span className={styles.resultMessage}>{resultMessage}</span>
            <br/>
            <span className={styles.resultMessage}>{answerIntervalMessage}</span>
        </div>;
    }

    renderPlayAgain() {
        const {onPlayAgainClick, screen} = this.props;
        const style = {cursor: 'pointer'};
        if (screen.contentHeight + 100 > screen.height) {
            style.top = 0;
        } else {
            style.bottom = screen.contentHeight;
        }
        return <div key='playAgain' style={style} className={`contentHeader ${styles.playAgain}`}>
            <div><span onClick={onPlayAgainClick}>{getText(TEXT_PLAY_AGAIN)}</span></div>
            <img onClick={onPlayAgainClick} src={this.randomHero} style={style} height={80}/>
        </div>;
    }

    render() {
        const {category, answerId, practiseStartRep} = this.props;
        return <div>
            {this.renderContent()}
            <PractiseStartFetch category={category} practiseStartRep={practiseStartRep}/>
            <PractiseEndFetch answerId={answerId} practiseStartRep={practiseStartRep}/>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        category: state.practise.category,
        answerId: state.practise.answerId,
        skipAnimation: state.practise.skipAnimation,
        practiseStartRep: state.repository.practiseStart,
        practiseEndRep: state.repository.practiseEnd,
    }),
    (dispatch) => ({
        onCategoryChange: (e) => dispatch(categoryChanged(e.id)),
        onAnswerClick: (id) => dispatch(answerIdChanged(id)),
        onPlayAgainClick: () => {
            dispatch(answerIdChanged(undefined));
            dispatch(skipAnimationChanged(false));
            clearPractiseStartFetch(dispatch);
            clearPractiseEndFetch(dispatch);
        },
        onSkipAnimationChange: skipAnimation => dispatch(skipAnimationChanged(skipAnimation))
    })
)(PractisePage);
