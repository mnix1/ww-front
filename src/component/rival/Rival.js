import React from 'react';
import {connect} from 'react-redux';
import styles from './styles.css';
import PropTypes from "prop-types";
import {TEXT_ANIMATION_TASK_RENDERER} from "../../util/taskRenderer";
import {skipAnimationChanged} from "../../redux/reducer/rival";
import {getText, TEXT_CLICK_ON_ANY, TEXT_QUESTION, TEXT_REMEMBER_DETAILS} from "../../lang";
import TaskObjectGroup from "./TaskObjectGroup";
import {prepareQuestionTiles} from "./objectsTaskQuestion";
import {prepareAnswerTiles} from "./objectsTaskAnswer";
import {prepareAnimationTiles} from "./objectsTaskAnimation";

class Rival extends React.PureComponent {

    static propTypes = {
        screen: PropTypes.object,
        pending: PropTypes.bool,
        rejected: PropTypes.bool,
        fulfilled: PropTypes.bool,
        question: PropTypes.object,
        answers: PropTypes.array,
        answerId: PropTypes.number,
        correctAnswerId: PropTypes.number,
        onAnswer: PropTypes.func,
        skipAnimation: PropTypes.bool,
        onSkipAnimationChange: PropTypes.func,
    };

    renderTask() {
        const {onAnswer, answerId, screen} = this.props;
        return <div>
            {!answerId && <div className="contentHeader">{getText(TEXT_QUESTION)}</div>}
            <TaskObjectGroup
                objects={prepareQuestionTiles(this).concat(prepareAnswerTiles(this))}
                onObjectClick={(e) => e.id && !answerId && onAnswer(e.id)}
                screen={screen}
            />
        </div>
    }

    renderAnimation() {
        const {onSkipAnimationChange, screen} = this.props;
        return <div>
            <div className="contentHeader">
                {getText(TEXT_REMEMBER_DETAILS)}
                <br/>
                {getText(TEXT_CLICK_ON_ANY)}
            </div>
            <TaskObjectGroup
                onObjectClick={() => onSkipAnimationChange(true)}
                objects={prepareAnimationTiles(this)}
                screen={screen}
            />
        </div>
    }

    shouldShowAnimation() {
        const {question, skipAnimation} = this.props;
        return question.taskRenderer === TEXT_ANIMATION_TASK_RENDERER && !skipAnimation;
    }

    renderContent() {
        if (this.shouldShowAnimation()) {
            return this.renderAnimation();
        }
        return this.renderTask();
    }

    render() {
        const {pending, rejected, fulfilled, answerId} = this.props;
        if (pending) {
            return 'LOADING';
        }
        if (rejected) {
            return 'REJECTED';
        }
        if (fulfilled) {
            return <div className={styles.rival}>
                {this.renderContent()}
            </div>
        }
        return null;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        skipAnimation: state.rival.skipAnimation
    }),
    (dispatch) => ({
        onSkipAnimationChange: skipAnimation => dispatch(skipAnimationChanged(skipAnimation))
    })
)(Rival);
