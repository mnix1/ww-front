import React from 'react';
import {getText, TEXT_CHANGE_LANGUAGE} from "../../lang/langText";
import gbFlag from "../../media/image/flag/GB.svg";
import {ENGLISH, langChanged, POLISH} from "../../redux/reducer/language";
import plFlag from "../../media/image/flag/PL.svg";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import request from "../../util/fetchHelper";
import {isCode1} from "../../util/repositoryHelper";

class ChangeLanguage extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        lang: PropTypes.string,
        handleLanguageClick: PropTypes.func,
    };

    static defaultProps = {
        className: ''
    };

    handleLanguageClick = (lang) => {
        const {onLangChange} = this.props;
        request('/profile/changeLanguage', {lang}).then((json) => {
            if (isCode1(json)) {
                onLangChange(json.lang);
            }
        });
    };

    render() {
        const {className, lang} = this.props;
        return <div className={`boxShadow paddingRem ${className}`}>
            <div>
                {getText(TEXT_CHANGE_LANGUAGE, lang)}
            </div>
            <div className='justifyCenter'>
                <img className='paddingRightRem cover pointer' alt='' src={gbFlag} height={25} width={40}
                     onClick={() => this.handleLanguageClick(ENGLISH)}/>
                <img className='cover pointer' alt='' src={plFlag} height={25} width={40}
                     onClick={() => this.handleLanguageClick(POLISH)}/>
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        lang: state.language.lang,
    }),
    (dispatch) => ({
        onLangChange: (lang) => dispatch(langChanged(lang)),
    })
)(ChangeLanguage);
