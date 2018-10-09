import React from 'react';
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
import {getText, TEXT_CHOOSE_CATEGORY, TEXT_CHOOSE_DIFFICULT, TEXT_NEXT, TEXT_QUESTION} from "../../lang/langText";
import {OBJECTS_CATEGORY_CIRCLE_WITH_RANDOM} from "../object-group/objectsCategory";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import {Route, Switch} from 'react-router'
import {push} from 'connected-react-router'
import {TRAINING_ROUTE, TRAINING_TASK_ROUTE} from "../routes";
import ContentWithImage from "../../component/content-with-image/ContentWithImage";
import {DIFFICULT_LEVEL_TO_NAME,} from "../../util/difficultyHelper";
import Rating from "../../component/rating/Rating";
import {getWisor} from "../../util/wisorHelper";
import {MESH_4} from "../../component/background/MeshBackground";
import TaskDescription from "../rival/component/TaskDescription";
import {remToPixels} from "../../util/fontHelper";
import {Loading} from "../../component/loading/Loading";
import {isRepFulfilled} from "../../util/repositoryHelper";
import ScreenPage from "../../component/page/ScreenPage";

class PractisePage extends React.PureComponent {

    renderChooseCategory() {
        const {screen, onCategoryChange, difficultyLevel, onDifficultLevelChange} = this.props;
        return <div className='pageContent'>
            <div className="pageHeader">{getText(TEXT_CHOOSE_DIFFICULT)}</div>
            <div className="pageHeader"><Rating valueString={difficultyLevel} onChange={onDifficultLevelChange}/></div>
            <div className="pageHeader">{getText(TEXT_CHOOSE_CATEGORY)}</div>
            <SimpleObjectGroup
                setHeight={false}
                objects={OBJECTS_CATEGORY_CIRCLE_WITH_RANDOM}
                onObjectClick={onCategoryChange}
                screen={{...screen, contentHeight: screen.contentHeight - 70}}
            />
        </div>;
    }

    renderTask() {
        const {screen, practiseStartRep, practiseEndRep, skipAnimation, onSkipAnimationChange, answerId, onAnswerClick} = this.props;
        if (!isRepFulfilled(practiseStartRep)) {
            return <Loading/>;
        }
        const question = practiseStartRep.value.practise.question;
        const correctAnswerId = _.get(practiseEndRep, 'value.correctAnswerId');
        return <div className='pageContent'>
            <TaskDescription className='justifyCenter flexColumn pageHeader' renderTask={false} renderTaskPoints={false}
                             task={question}/>
            {answerId && correctAnswerId && this.renderPlayAgain()}
            <Task key='task'
                  offsetHeight={remToPixels(3)}
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

    renderPlayAgain() {
        const {onPlayAgainClick, profile} = this.props;
        return <ContentWithImage key='playAgain' imgSrc={getWisor(profile.wisorType)} onClick={onPlayAgainClick}
                                 id='playAgain'>
            <div className='flexColumn'>
                <span>{getText(TEXT_NEXT)}</span>
                <span>{getText(TEXT_QUESTION).toLowerCase()}</span>
            </div>
        </ContentWithImage>;
    }

    render() {
        const {category, difficultyLevel, answerId, practiseStartRep} = this.props;
        return <ScreenPage customContent={true} mesh={MESH_4}>
            <Switch>
                <Route exact path={TRAINING_ROUTE} render={() => this.renderChooseCategory()}/>
                <Route path={TRAINING_TASK_ROUTE} render={() => this.renderTask()}/>
            </Switch>
            <PractiseStartFetch category={category} difficultyLevel={difficultyLevel}
                                practiseStartRep={practiseStartRep}/>
            <PractiseEndFetch answerId={answerId} practiseStartRep={practiseStartRep}/>
        </ScreenPage>
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
