import React from 'react';
import './styles.css';
import diamond from '../../media/image/resource/diamond.svg';

export default class Diamond extends React.PureComponent {

    render() {
        const {children} = this.props;
        return <div className='resource'>
            {children}
            <img src={diamond} height={20}/>
        </div>
    }
}
