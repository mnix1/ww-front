import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {getText, TEXT_EXPERIENCE, TEXT_LEVEL} from "../../lang/langText";
import _ from "lodash";
import Line from "rc-progress/es/Line";
import {getNextLevelExperience} from "../../util/experienceHelper";
import {GREEN_COLOR} from "../../util/style/constant";

class Experience extends React.PureComponent {

    static propTypes = {
        level: PropTypes.number,
        levelGain: PropTypes.number,
        lineWidth: PropTypes.number,
        experience: PropTypes.number,
        experienceGain: PropTypes.number,
        lang: PropTypes.string,
        className: PropTypes.string,
        styleMargin: PropTypes.bool,
        stylePadding: PropTypes.bool,
        styleBoxShadow: PropTypes.bool,
        styleBackground: PropTypes.bool,
        style: PropTypes.object,
        renderTitle: PropTypes.bool,
        renderNumbers: PropTypes.bool,
    };

    static defaultProps = {
        styleMargin: true,
        stylePadding: false,
        lineWidth: 100,
        styleBoxShadow: true,
        styleBackground: true,
        renderTitle: true,
        renderNumbers: true,
    };

    renderLevelGain() {
        const {levelGain} = this.props;
        if (!levelGain) {
            return null;
        }
        return <span className='justifyCenter flexColumn marginLeftRem' style={{color: GREEN_COLOR}}>
            (+{levelGain})
        </span>
    }

    renderExperienceGain() {
        const {experienceGain} = this.props;
        if (!experienceGain) {
            return null;
        }
        return <span className='justifyCenter flexColumn' style={{color: GREEN_COLOR}}>
            (+{experienceGain})
        </span>
    }

    renderExp() {
        const {level, experience, lineWidth, renderNumbers} = this.props;
        const nextLevelExp = getNextLevelExperience(level);
        return <div className='justifyCenter relative paddingTopRem'>
            <div className='justifyCenter flexColumn'>
                <Line style={{width: lineWidth}} percent={experience * 100 / nextLevelExp} strokeWidth="7"/>
            </div>
            <div className='justifyCenter fontSize08Rem marginLeftRem'>
                {renderNumbers ? experience : null}
                {this.renderExperienceGain()}
                {renderNumbers ? '/' + nextLevelExp : null}
            </div>
        </div>
    }

    render() {
        const {level, lang, styleMargin, styleBoxShadow, styleBackground, renderTitle} = this.props;
        return <div className={`justifyStart flexColumn relative`}>
            {renderTitle &&
            <span className={`justifyCenter ${styleMargin ? 'marginRem' : ''}`}>{getText(TEXT_EXPERIENCE, lang)}</span>}
            <div
                className={`paddingRem relative ${styleMargin ? 'marginRem' : ''} ${styleBoxShadow ? 'boxShadow' : ''}`}>
                {styleBackground && <div className='absoluteBackgroundMix blackBackground'/>}
                <span className='justifyCenter relative'>
                    {_.upperFirst(getText(TEXT_LEVEL, lang))} {level}
                    {this.renderLevelGain()}
                </span>
                {this.renderExp()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        lang: state.language.lang,
    }),
    (dispatch) => ({})
)(Experience);
