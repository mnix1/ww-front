import React from 'react';
import Joyride from 'react-joyride';

export default class Intro extends React.PureComponent {
    state = {
        run: true,
        steps: [
            {
                target: '.topBarContentValue',
                content: 'This if my awesome feature!',
                placement: 'bottom',
            },
            {
                target: '.my-other-step',
                content: 'This if my awesome feature!',
                placement: 'bottom',
            },
        ]
    };

    componentDidMount() {
        this.setState({run: true});
    }

    callback = (data) => {
        const {action, index, type} = data;
    };

    render() {
        const {steps, run} = this.state;

        return <div className="">
            <Joyride
                steps={steps}
                run={run}
                callback={this.callback}
            />
        </div>
    }
}