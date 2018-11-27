import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import {INTRO_STEP_GO_TO_APP_FROM_OPTIONS, STEP_ID_TO_NEXT_STEP_INDEX} from "../introHelper";
import {getFullWisor, getIntroWisor} from "../../../util/wisorHelper";
import {getText, TEXT_CONTINUE, TEXT_HIDE, TEXT_THIS_WINDOW} from "../../../lang/langText";
import {FaArrowRight, FaWindowClose} from 'react-icons/fa';
import {stepIndexChanged} from "../../../redux/reducer/intro";
import _ from 'lodash';
import ChangeLanguage from "../../../component/change-language/ChangeLanguage";

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
        renderHide: PropTypes.bool,
        renderChangeLanguage: PropTypes.bool,
        render: PropTypes.bool,
        enableOpacity: PropTypes.bool,
        screen: PropTypes.object,
        stepId: PropTypes.string,
        children: PropTypes.node,
        onContinueClick: PropTypes.func,
        wisorHeightFactor: PropTypes.number,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.number,
        lang: PropTypes.string,
    };

    static defaultProps = {
        renderContinue: true,
        renderHide: false,
        renderChangeLanguage: false,
        enableOpacity: false,
        render: true,
        width: 'auto',
    };

    state = {
        hidden: false
    };

    get wisorHeightFactor() {
        const {wisorHeightFactor, screen} = this.props;
        if (!_.isNil(wisorHeightFactor)) {
            return wisorHeightFactor;
        }
        if (!screen.verticalOrientation && screen.isSmallHeight) {
            return 3;
        }
        if (screen.isSmallHeight) {
            return 4;
        }
        return 5;
    }

    get maxWidth() {
        const {maxWidth, screen} = this.props;
        if (!_.isNil(maxWidth)) {
            return maxWidth;
        }
        if (screen.verticalOrientation) {
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
        const {screen, stepId, children, onContinueClick, renderContinue, renderHide, renderChangeLanguage, render, width, enableOpacity, lang} = this.props;
        const {hidden} = this.state;
        const style = {width, maxWidth: this.maxWidth};
        const wisorHeight = screen.standardImgHeight * this.wisorHeightFactor;
        const wisorWidth = wisorHeight * .68;
        return render && !hidden && <div className='boxShadow relative paddingRem'
                                         style={style}>
            <div className={`blackBackground absoluteBackgroundMix ${enableOpacity ? 'opacity1' : ''}`}/>
            <div className='relative justifyCenter'>
                <div className='justifyStart'>
                    <img alt='' src={this.introWisor} width={wisorWidth} height={wisorHeight}/>
                </div>
                <div className='paddingLeftRem justifyBetween flexColumn'>
                    <div className='fontSize09Rem'>
                        {children}
                    </div>
                    <div className='justifyStart'>
                        {renderChangeLanguage && <ChangeLanguage className='marginRightRem'/>}
                        {renderContinue && <div>
                            <Button
                                onClick={() => onContinueClick(STEP_ID_TO_NEXT_STEP_INDEX[stepId])}
                                material={BUTTON_MATERIAL_BOX_SHADOW}
                                icon={<FaArrowRight/>}>
                                {getText(TEXT_CONTINUE, lang)}
                            </Button>
                        </div>}
                        {renderHide && <div>
                            <Button
                                onClick={() => this.setState({hidden: true})}
                                material={BUTTON_MATERIAL_BOX_SHADOW}
                                icon={<FaWindowClose/>}>
                                {`${getText(TEXT_HIDE, lang)} ${getText(TEXT_THIS_WINDOW).toLowerCase()}`}
                            </Button>
                        </div>}

                    </div>
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
        lang: state.language.lang,
    }),
    (dispatch) => ({
        onContinueClick: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
    })
)(IntroStep);
