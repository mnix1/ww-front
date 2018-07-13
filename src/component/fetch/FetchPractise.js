import React from 'react';
import connect from 'react-redux-fetch';
import {isCategoryId} from "../tile/tileCategoryHelper";

class FetchPractise extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {contentId, dispatchPractiseGet} = this.props;
        if (prevProps.contentId !== contentId && isCategoryId(contentId)) {
            dispatchPractiseGet(contentId);
        }
    }

    render() {
        return null;
    }
}

export default connect([{
    resource: 'practise',
    request: (category) => ({
        url: `/practise/start?category=${category}`
    })
}])(FetchPractise);