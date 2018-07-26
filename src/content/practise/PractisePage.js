import React from 'react';
import styles from './styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import {answerIdChanged, categoryChanged, skipAnimationChanged} from "../../redux/reducer/rival";
import Rival from "../../component/rival/Rival";
import PractiseRivalStartFetch, {clearPractiseRivalStartFetch} from "./fetch/PractiseRivalStartFetch";
import PractiseRivalEndFetch, {clearPractiseRivalEndFetch} from "./fetch/PractiseRivalEndFetch";
import {randomHero} from "../../util/media/HeroHelper";
import {
    getText,
    TEXT_CHOOSE_CATEGORY,
    TEXT_CORRECT_ANSWER,
    TEXT_PLAY_AGAIN,
    TEXT_TIME,
    TEXT_WRONG_ANSWER
} from "../../lang";
import {OBJECTS_CATEGORY} from "../object-group/objectsCategory";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";

class PractisePage extends React.PureComponent {

    randomHero = randomHero();

    renderContent() {
        const {category} = this.props;
        if (category === undefined) {
            return this.renderChooseCategory();
        }
        return this.renderRival();
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

    renderRival() {
        const {practiseRivalStartRep, practiseRivalEndRep, answerId, onAnswer} = this.props;
        const correctAnswerId = _.get(practiseRivalEndRep, 'value.correctAnswerId');
        return <div>
            {answerId && correctAnswerId && [this.renderResult(), this.renderPlayAgain()]}
            <Rival key='rival'
                   pending={_.get(practiseRivalStartRep, 'pending')}
                   rejected={_.get(practiseRivalStartRep, 'rejected')}
                   fulfilled={_.get(practiseRivalStartRep, 'fulfilled')}
                   question={_.get(practiseRivalStartRep, 'value.practise.question')}
                   answers={_.get(practiseRivalStartRep, 'value.practise.question.answers')}
                   correctAnswerId={_.get(practiseRivalEndRep, 'value.correctAnswerId')}
                   answerId={answerId}
                   onAnswer={onAnswer}/>
        </div>
    }

    renderResult() {
        const {answerId, practiseRivalEndRep} = this.props;
        const correctAnswerId = _.get(practiseRivalEndRep, 'value.correctAnswerId');
        if (!correctAnswerId) {
            return null;
        }
        const answerInterval = _.get(practiseRivalEndRep, 'value.answerInterval');
        const answerIntervalMessage = `${getText(TEXT_TIME)}${(answerInterval / 1000).toFixed(1)} s`;
        const resultMessage = correctAnswerId === answerId ? getText(TEXT_CORRECT_ANSWER) : getText(TEXT_WRONG_ANSWER);
        return <div key='result' className="contentHeader">
            <span className={styles.resultMessage}>{resultMessage}</span>
            <br/>
            <span className={styles.resultMessage}>{answerIntervalMessage}</span>
        </div>;
    }

    renderPlayAgain() {
        const {onPlayAgain, screen} = this.props;
        const style = {cursor: 'pointer'};
        if (screen.contentHeight + 100 > screen.height) {
            style.top = 0;
        } else {
            style.bottom = screen.contentHeight;
        }
        return <div key='playAgain' style={style} className={`contentHeader ${styles.playAgain}`}>
            <div><span onClick={onPlayAgain}>{getText(TEXT_PLAY_AGAIN)}</span></div>
            <img onClick={onPlayAgain} src={this.randomHero} style={style} height={80}/>
        </div>;
    }

    render() {
        const {category, answerId, practiseRivalStartRep} = this.props;
        return <div>
            {this.renderContent()}
            <PractiseRivalStartFetch category={category} practiseRivalStartRep={practiseRivalStartRep}/>
            <PractiseRivalEndFetch answerId={answerId} practiseRivalStartRep={practiseRivalStartRep}/>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        category: state.rival.category,
        answerId: state.rival.answerId,
        practiseRivalStartRep: state.repository.practiseRivalStart,
        practiseRivalEndRep: state.repository.practiseRivalEnd,
    }),
    (dispatch) => ({
        onCategoryChange: (e) => dispatch(categoryChanged(e.id)),
        onAnswer: (id) => dispatch(answerIdChanged(id)),
        onPlayAgain: () => {
            dispatch(answerIdChanged(undefined));
            dispatch(skipAnimationChanged(false));
            clearPractiseRivalStartFetch(dispatch);
            clearPractiseRivalEndFetch(dispatch);
        }
    })
)(PractisePage);
