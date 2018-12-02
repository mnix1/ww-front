import React from 'react';
import {connect} from 'react-redux';
import ScreenPage from "../../component/page/ScreenPage";
import {getText, TEXT_CLAIM_REWARD, TEXT_DELETE, TEXT_MAIL, TEXT_NO_MAIL} from "../../lang/langText";
import {isRepFulfilled} from "../../util/repositoryHelper";
import {Loading} from "../../component/loading/Loading";
import {prepareMailFromType} from "../../util/mailHelper";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {FaCheckCircle, FaTrash} from 'react-icons/fa';
import {claimRewardIdChanged, deleteIdChanged, readIdChanged} from "../../redux/reducer/mail";
import MailClaimRewardFetch from "./fetch/MailClaimRewardFetch";
import MailDeleteFetch from "./fetch/MailDeleteFetch";
import _ from 'lodash';
import MailDisplayedFetch from "./fetch/MailDisplayedFetch";

class MailPage extends React.PureComponent {

    renderMails() {
        const {mailListRep, lang} = this.props;
        if (!isRepFulfilled(mailListRep)) {
            return <Loading/>;
        }
        if (_.isEmpty(mailListRep.value)) {
            return <div className='pageHeader marginTopRem fontSize08Rem'>{getText(TEXT_NO_MAIL, lang)}</div>
        }
        return mailListRep.value.map(e => this.renderMail(e, mailListRep.value.length === 1));
    }

    renderMail(mail, onlyOneMail) {
        const {lang, readId, onReadMailClick} = this.props;
        mail = prepareMailFromType(mail, lang);
        return <div className=' marginRem paddingRem boxShadow width100 pointer' key={mail.id}
                    onClick={() => onReadMailClick(readId === mail.id ? undefined : mail.id)}>
            <div className='justifyCenter flexColumn'>
                <div className='justifyBetween'>
                    <div className='justifyCenter flexColumn'>{mail.title}</div>
                    <div className='justifyCenter'>
                        <div
                            className='justifyCenter flexColumn fontSize06Rem marginRightRem'>{new Date(mail.creationDate).toLocaleString()}</div>
                        <div className='justifyCenter flexColumn'>
                            {mail.hasResources && !mail.claimed ? this.renderClaimRewardButton(mail) : this.renderDeleteButton(mail)}
                        </div>
                    </div>
                </div>
                {(readId === mail.id || onlyOneMail) && this.renderMailContent(mail)}
            </div>
        </div>
    }

    renderDeleteButton(mail) {
        const {lang, onDeleteMailClick} = this.props;
        return <Button
            icon={<FaTrash/>}
            material={BUTTON_MATERIAL_BOX_SHADOW}
            onClick={(e) => {
                e.stopPropagation();
                onDeleteMailClick(mail.id);
            }}>{getText(TEXT_DELETE, lang)}
        </Button>
    }

    renderClaimRewardButton(mail) {
        const {lang, onClaimMailRewardClick} = this.props;
        return <Button
            icon={<FaCheckCircle/>}
            material={BUTTON_MATERIAL_BOX_SHADOW}
            onClick={(e) => {
                e.stopPropagation();
                onClaimMailRewardClick(mail.id);
            }}>{getText(TEXT_CLAIM_REWARD, lang)}
        </Button>
    }

    renderMailContent(mail) {
        const {screen} = this.props;
        return <div className='justifyCenter' key={mail.id}>
            <div className='relative'>
                <div className='marginAuto width100 opacity1 boxShadow marginTopRem'
                     style={{width: '90%'}}>
                    <div className='justifyCenter height100 flexColumn relative paddingRem'
                         style={{lineHeight: screen.fontSizeRem + 'px'}}>
                        {mail.content}
                        {mail.hasResources && !mail.claimed &&
                        <div className='justifyEnd'>
                            {this.renderClaimRewardButton(mail)}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    }

    render() {
        const {lang, screen, path, claimRewardId, deleteId, mailListRep} = this.props;
        const sendDisplayed = isRepFulfilled(mailListRep) && _.some(mailListRep.value, e => !e.displayed);
        return <ScreenPage>
            <div className='pageHeader'>{getText(TEXT_MAIL, lang)}</div>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn' style={{width: screen.contentWidth * 0.8}}>
                    {this.renderMails()}
                </div>
            </div>
            <MailClaimRewardFetch path={path} claimRewardId={claimRewardId}/>
            <MailDeleteFetch path={path} deleteId={deleteId}/>
            {sendDisplayed && <MailDisplayedFetch path={path}/>}
        </ScreenPage>
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        lang: state.language.lang,
        readId: state.mail.readId,
        deleteId: state.mail.deleteId,
        claimRewardId: state.mail.claimRewardId,
        mailListRep: state.repository.mailList,
        screen: state.screen,
    }),
    (dispatch) => ({
        onClaimMailRewardClick: id => dispatch(claimRewardIdChanged(id)),
        onReadMailClick: id => dispatch(readIdChanged(id)),
        onDeleteMailClick: id => dispatch(deleteIdChanged(id))
    })
)(MailPage);
