import React from 'react';
import connect from 'react-redux-fetch';

class PractiseRivalFetch extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {category, dispatchPractiseGet} = this.props;
        if (category !== undefined && prevProps.category !== category) {
            dispatchPractiseGet(category);
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
}])(PractiseRivalFetch);