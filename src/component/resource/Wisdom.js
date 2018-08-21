import React from 'react';
import wisdom from '../../media/image/resource/wisdom.svg';
import Resource from "./Resource";

export default class Wisdom extends React.PureComponent {

    render() {
        return <Resource imgSrc={wisdom} {...this.props}/>
    }
}
