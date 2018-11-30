import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';
import {INTRO_STEP_PICK_WISIES, PICK_WISIE_COUNT, STEP_INDEX_TO_STEP_ID} from "../introHelper";

class IntroPickWisiesFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearIntroPickWisiesFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {introductionStepIndex, pickWisies, dispatchIntroPickWisiesPost} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        if (pickWisies.length === PICK_WISIE_COUNT
            && prevProps.pickWisies.length !== PICK_WISIE_COUNT
            && _.includes([INTRO_STEP_PICK_WISIES], stepId)
        ) {
            dispatchIntroPickWisiesPost(pickWisies);
        }
    }

    render() {
        return null;
    }
}

export function clearIntroPickWisiesFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'introPickWisies'}});
}

export default connect([{
    method: 'post',
    resource: 'introPickWisies',
    request: (wisieTypes) => ({
        url: `/intro/pickWisies`,
        body: {wisieTypes}
    })
}])(IntroPickWisiesFetch);