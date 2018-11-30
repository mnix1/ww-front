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
        experience: PropTypes.number,
        experienceGain: PropTypes.number,
        lang: PropTypes.string,
        className: PropTypes.string,
        styleMargin: PropTypes.bool,
        stylePadding: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        styleMargin: false,
        stylePadding: false,
    };

    renderLevelGain() {
        const {levelGain} = this.props;
        if (!levelGain) {
            return null;
        }
        return <span className='fontSize08Rem justifyCenter flexColumn'
                     style={{color: GREEN_COLOR}}>(+{levelGain})</span>
    }

    renderExperienceGain() {
        const {experienceGain} = this.props;
        if (!experienceGain) {
            return null;
        }
        return <span className='fontSize06Rem justifyCenter flexColumn'
                     style={{color: GREEN_COLOR}}>(+{experienceGain})</span>
    }

    render() {
        const {level, experience, lang} = this.props;
        const nextLevelExp = getNextLevelExperience(level);
        return <div className={`justifyStart flexColumn relative`}>
            <span className='justifyCenter marginRem'>{getText(TEXT_EXPERIENCE, lang)}</span>
            <div className='boxShadow paddingRem marginRem relative'>
                <div className='absoluteBackgroundMix blackBackground'/>
                <span className='justifyCenter relative'>
                    {_.upperFirst(getText(TEXT_LEVEL, lang))} {level}
                    {this.renderLevelGain()}
                </span>
                <div className='justifyCenter relative'>
                    <div className='justifyCenter flexColumn'>
                        <Line style={{width: 100}} percent={experience * 100 / nextLevelExp} strokeWidth="7"/>
                    </div>
                    <div
                        className='justifyCenter fontSize08Rem marginLeftRem'>{experience}{this.renderExperienceGain()}/{nextLevelExp}
                    </div>

                </div>
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
