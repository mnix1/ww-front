import React from 'react';
import {connect} from 'react-redux';
import Modal from "../../../component/modal/Modal";
import {getText, TEXT_SIGNING_IN} from "../../../lang/langText";
import {Loading} from "../../../component/loading/Loading";
import {isRepPending} from "../../../util/repositoryHelper";

class SigningIn extends React.PureComponent {
    render() {
        const {testSignInRep} = this.props;
        if (!isRepPending(testSignInRep)) {
            return null;
        }
        return <Modal renderExit={false}>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>{getText(TEXT_SIGNING_IN)}</div>
                <div className='paddingLeftRem inlineBlock'>
                    <Loading/>
                </div>
            </div>
        </Modal>
    }
}

export default connect(
    (state) => ({
        testSignInRep: state.repository.testSignIn,
    }),
    (dispatch) => ({})
)(SigningIn);
