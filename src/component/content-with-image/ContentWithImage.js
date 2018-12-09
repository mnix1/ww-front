import React from 'react';
import './styles.css';
import PropTypes from "prop-types";

export default class ContentWithImage extends React.PureComponent {

    static propTypes = {
        imgSrc: PropTypes.string,
        children: PropTypes.node,
        imgHeight: PropTypes.number,
        onClick: PropTypes.func,
        id: PropTypes.string,
    };

    static defaultProps = {
        imgHeight: 80,
    };

    render() {
        const {onClick, id, children, imgHeight, imgSrc} = this.props;
        return <div onClick={onClick} key={id} className='contentWithImage'>
            <div className="content">
                <div className="absoluteBackgroundMix"/>
                <div className='content'>
                    {children}
                    <img draggable="false" alt='' src={imgSrc} height={imgHeight}/>
                </div>
            </div>
        </div>;
    }

}
