import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import {INTRO_STEP_GO_TO_APP_FROM_OPTIONS, STEP_ID_TO_NEXT_STEP_INDEX} from "../introHelper";
import {getFullWisor, getIntroWisor} from "../../../util/wisorHelper";
import {getText, TEXT_CONTINUE} from "../../../lang/langText";
import {FaArrowRight} from 'react-icons/fa';
import {stepIndexChanged} from "../../../redux/reducer/intro";
import _ from 'lodash';

export function prepareIntroStep(afterReload, {stepId, content, selector, position}) {
    return {
        selector: _.defaultTo(selector, `.${stepId}`),
        content,
        position: afterReload ? 'center' : _.defaultTo(position, 'top'),
    }
}

class IntroStep extends React.PureComponent {

    static propTypes = {
        renderContinue: PropTypes.bool,
        render: PropTypes.bool,
        screen: PropTypes.object,
        stepId: PropTypes.string,
        children: PropTypes.node,
        onContinueClick: PropTypes.func,
        wisorHeightFactor: PropTypes.number,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.number,
    };

    static defaultProps = {
        renderContinue: true,
        render: true,
        width: 'auto',
    };

    get wisorHeightFactor() {
        const {wisorHeightFactor, screen} = this.props;
        if (!_.isNil(wisorHeightFactor)) {
            return wisorHeightFactor;
        }
        if (!screen.moreHeightThanWidth && screen.isSmallHeight) {
            return 3;
        }
        return 5;
    }

    get maxWidth() {
        const {maxWidth, screen} = this.props;
        if (!_.isNil(maxWidth)) {
            return maxWidth;
        }
        if (screen.moreHeightThanWidth) {
            return Math.min(screen.contentWidth * 0.9, 800);
        }
        return Math.min(screen.contentWidth * 0.7, 800);
    }

    get introWisor() {
        const {stepIndex} = this.props;
        if (stepIndex >= STEP_ID_TO_NEXT_STEP_INDEX[INTRO_STEP_GO_TO_APP_FROM_OPTIONS]) {
            const {wisorType} = this.props.profile;
            return getFullWisor(wisorType);
        }
        return getIntroWisor();
    }

    render() {
        const {screen, stepId, children, onContinueClick, renderContinue, render, width} = this.props;
        const style = {width, maxWidth: this.maxWidth};
        return render && <div className='boxShadow relative paddingRem'
                              style={style}>
            <div className='blackBackground absoluteBackgroundMix'/>
            <div className='relative justifyCenter'>
                <img alt='' src={this.introWisor} height={screen.wisieImgHeight * this.wisorHeightFactor}/>
                <div className='paddingLeftRem justifyBetween flexColumn'>
                    {children}
                    {renderContinue && <div>
                        <Button
                            onClick={() => onContinueClick(STEP_ID_TO_NEXT_STEP_INDEX[stepId])}
                            material={BUTTON_MATERIAL_BOX_SHADOW}
                            icon={<FaArrowRight/>}>
                            {getText(TEXT_CONTINUE)}
                        </Button>
                    </div>}
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        stepIndex: state.intro.stepIndex,
    }),
    (dispatch) => ({
        onContinueClick: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStep);
