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
    TEXT_NEXT,
    TEXT_QUESTION,
    TEXT_WRONG_ANSWER
} from "../../lang";
import {OBJECTS_CATEGORY} from "../object-group/objectsCategory";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import {prepareAnswerIntervalMessage} from "../../util/textHelper";
import {Route, Switch} from 'react-router'
import {push} from 'connected-react-router'
import {TRAINING_ROUTE} from "../routes";

const TASK_ROUTE = TRAINING_ROUTE + '/task';

class PractisePage extends React.PureComponent {

    randomHero = randomHero();

    renderChooseCategory() {
        const {screen, onCategoryChange} = this.props;
        return <div className='pageContent'>
            <div className="contentHeader">{getText(TEXT_CHOOSE_CATEGORY)}</div>
            <SimpleObjectGroup
                objects={OBJECTS_CATEGORY}
                onObjectClick={onCategoryChange}
                screen={screen}
            />
        </div>;
    }

    renderTask() {
        const {screen, practiseStartRep, practiseEndRep, skipAnimation, onSkipAnimationChange, answerId, onAnswerClick} = this.props;
        if (!practiseStartRep || !practiseStartRep.fulfilled) {
            return null;
        }
        const correctAnswerId = _.get(practiseEndRep, 'value.correctAnswerId');
        return <div className='pageContent'>
            {answerId && correctAnswerId && [this.renderResult(), this.renderPlayAgain()]}
            <Task key='task'
                  header={!answerId && <div className="contentHeader">{getText(TEXT_QUESTION)}:</div>}
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
        const resultMessage = correctAnswerId === answerId ? getText(TEXT_CORRECT_ANSWER) : getText(TEXT_WRONG_ANSWER);
        return <div key='result' className="contentHeader">
            <span className={styles.resultMessage}>{resultMessage}</span>
            <br/>
            <span className={styles.resultMessage}>{prepareAnswerIntervalMessage(answerInterval)}</span>
        </div>;
    }

    renderPlayAgain() {
        const {onPlayAgainClick} = this.props;
        return <div onClick={onPlayAgainClick} key='playAgain' className='playAgain'>
            <div>
                <span>{getText(TEXT_NEXT)}</span>
                <span>{getText(TEXT_QUESTION).toLowerCase()}</span>
            </div>
            <img alt='' src={this.randomHero} height={80}/>
        </div>;
    }

    render() {
        const {category, answerId, practiseStartRep} = this.props;
        return <div className='page'>
            <div className='pageBackground'/>
            <Switch>
                <Route exact path={TRAINING_ROUTE} render={() => this.renderChooseCategory()}/>
                <Route path={TASK_ROUTE} render={() => this.renderTask()}/>
            </Switch>
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
        path: state.router.location.pathname
    }),
    (dispatch) => ({
        onCategoryChange: (e) => {
            dispatch(categoryChanged(e.id));
            dispatch(push(TASK_ROUTE));
        },
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
