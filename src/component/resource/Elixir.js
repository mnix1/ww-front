import React from 'react';
import elixir from '../../media/image/resource/elixir.svg';
import Resource from "./Resource";

export default class Elixir extends React.PureComponent {

    render() {
        return <Resource imgSrc={elixir} {...this.props}/>
    }
}
