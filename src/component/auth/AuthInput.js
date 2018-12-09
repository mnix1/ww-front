import React from 'react';

export default class AuthInput extends React.PureComponent {

    handleEnter = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
    };

    render() {
        const {value, onChange, type, className, placeholder} = this.props;
        return <input
            value={value}
            onChange={event => onChange(event.target.value)}
            type={type}
            onKeyDown={this.handleEnter}
            className={className}
            style={{width: '12rem'}}
            placeholder={placeholder}
        />
    }
}