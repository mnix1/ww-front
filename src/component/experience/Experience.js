import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {getText, TEXT_EXPERIENCE, TEXT_LEVEL} from "../../lang/langText";
import _ from "lodash";
import Line from "rc-progress/es/Line";
import {getNextLevelExperience} from "../../util/experienceHelper";

class Experience extends React.PureComponent {

    static propTypes = {
        level: PropTypes.number,
        experience: PropTypes.number,
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

    render() {
        const {level, experience, lang} = this.props;
        const nextLevelExp = getNextLevelExperience(level);
        return <div className={`justifyStart flexColumn relative`}>
            <span className='justifyCenter marginRem'>{getText(TEXT_EXPERIENCE, lang)}</span>
            <div className='boxShadow paddingRem marginRem relative'>
                <div className='absoluteBackgroundMix blackBackground'/>
                <span className='justifyCenter relative'>
                    {_.upperFirst(getText(TEXT_LEVEL, lang))} {level}
                </span>
                <div className='justifyCenter relative'>
                    <div className='justifyCenter flexColumn'>
                        <Line style={{width: 100}} percent={experience / nextLevelExp} strokeWidth="7"/>
                    </div>
                    <div
                        className='justifyCenter flexColumn fontSize08Rem marginLeftRem'>{experience}/{nextLevelExp}</div>
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
