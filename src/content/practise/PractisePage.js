import React from 'react';
import styles from './styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import {
    answerIdChanged,
    categoryChanged,
    difficultyLevelChanged,
    skipAnimationChanged
} from "../../redux/reducer/practise";
import Task from "../../component/task/Task";
import PractiseStartFetch, {clearPractiseStartFetch} from "./fetch/PractiseStartFetch";
import PractiseEndFetch, {clearPractiseEndFetch} from "./fetch/PractiseEndFetch";
import {getWisie} from "../../util/wisieHelper";
import {
    getText,
    TEXT_CHOOSE_CATEGORY,
    TEXT_CHOOSE_DIFFICULT,
    TEXT_CORRECT_ANSWER,
    TEXT_NEXT,
    TEXT_QUESTION,
    TEXT_WRONG_ANSWER
} from "../../lang/langText";
import {OBJECTS_CATEGORY} from "../object-group/objectsCategory";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import {prepareAnswerIntervalMessage} from "../../util/textHelper";
import {Route, Switch} from 'react-router'
import {push} from 'connected-react-router'
import {TRAINING_ROUTE, TRAINING_TASK_ROUTE} from "../routes";
import ContentWithImage from "../../component/content-with-image/ContentWithImage";
import {DIFFICULT_LEVEL_TO_NAME,} from "../../util/difficultyHelper";
import Rating from "../../component/rating/Rating";

class PractisePage extends React.PureComponent {

    renderChooseCategory() {
        const {screen, onCategoryChange, difficultyLevel, onDifficultLevelChange} = this.props;
        return <div className='pageContent'>
            <div className="pageHeader">{getText(TEXT_CHOOSE_DIFFICULT)}</div>
            <div className="pageHeader"><Rating valueString={difficultyLevel} onChange={onDifficultLevelChange}/></div>
            <div className="pageHeader">{getText(TEXT_CHOOSE_CATEGORY)}</div>
            <SimpleObjectGroup
                setHeight={false}
                objects={OBJECTS_CATEGORY}
                onObjectClick={onCategoryChange}
                screen={{...screen, contentHeight: screen.contentHeight - 70}}
            />
        </div>;
    }

    renderTask() {
        const {screen, practiseStartRep, practiseEndRep, skipAnimation, onSkipAnimationChange, answerId, onAnswerClick} = this.props;
        if (!practiseStartRep || !practiseStartRep.fulfilled) {
            return null;
        }
        const question = practiseStartRep.value.practise.question;
        const correctAnswerId = _.get(practiseEndRep, 'value.correctAnswerId');
        return <div className='pageContent'>
            {answerId && correctAnswerId && [this.renderResult(), this.renderPlayAgain()]}
            <Task key='task'
                  contentHeightCalculator={(screen) => {
                      const {contentHeight, moreHeightThanWidth, isSmallHeight} = screen;
                      return contentHeight / 9 * ((!moreHeightThanWidth && isSmallHeight) ? 7 : 8);
                  }}
                  header={!answerId && <div className="contentHeader">{getText(TEXT_QUESTION)}:
                      <span><Rating style={{paddingLeft: '0.25rem'}} valueString={question.difficultyLevel}
                                    onHoverChange={_.noop}/></span></div>}
                  screen={screen}
                  skipAnimation={skipAnimation}
                  onSkipAnimationChange={onSkipAnimationChange}
                  question={question}
                  answers={question.answers}
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
        const {onPlayAgainClick, profile} = this.props;
        return <ContentWithImage key='playAgain' imgSrc={getWisie(profile.heroType)} onClick={onPlayAgainClick}
                                 id='playAgain'>
            <div className='flexColumn'>
                <span>{getText(TEXT_NEXT)}</span>
                <span>{getText(TEXT_QUESTION).toLowerCase()}</span>
            </div>
        </ContentWithImage>;
    }

    render() {
        const {category, difficultyLevel, answerId, screen, practiseStartRep} = this.props;
        return <div className='page' style={{height: screen.contentHeight}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            <Switch>
                <Route exact path={TRAINING_ROUTE} render={() => this.renderChooseCategory()}/>
                <Route path={TRAINING_TASK_ROUTE} render={() => this.renderTask()}/>
            </Switch>
            <PractiseStartFetch category={category} difficultyLevel={difficultyLevel}
                                practiseStartRep={practiseStartRep}/>
            <PractiseEndFetch answerId={answerId} practiseStartRep={practiseStartRep}/>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        category: state.practise.category,
        difficultyLevel: state.practise.difficultyLevel,
        answerId: state.practise.answerId,
        skipAnimation: state.practise.skipAnimation,
        practiseStartRep: state.repository.practiseStart,
        practiseEndRep: state.repository.practiseEnd,
        path: state.router.location.pathname
    }),
    (dispatch) => ({
        onCategoryChange: (e) => {
            clearPractiseStartFetch(dispatch);
            clearPractiseEndFetch(dispatch);
            dispatch(answerIdChanged(undefined));
            dispatch(skipAnimationChanged(false));
            dispatch(categoryChanged(e.id));
            dispatch(push(TRAINING_TASK_ROUTE));
        },
        onDifficultLevelChange: (e) => {
            dispatch(difficultyLevelChanged(DIFFICULT_LEVEL_TO_NAME[e]));
        },
        onAnswerClick: (id) => dispatch(answerIdChanged(id)),
        onPlayAgainClick: () => {
            clearPractiseStartFetch(dispatch);
            clearPractiseEndFetch(dispatch);
            dispatch(answerIdChanged(undefined));
            dispatch(skipAnimationChanged(false));
        },
        onSkipAnimationChange: skipAnimation => dispatch(skipAnimationChanged(skipAnimation))
    })
)(PractisePage);
