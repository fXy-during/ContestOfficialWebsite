import  React from 'react';
import { hashHistory } from 'react-router';

import './style.less';

function Logo(props) {
    function handleClick() {
        hashHistory.push('/home');
    }
    return (
        <img className='header-logo' src='../src/static/images/logo.png' onClick={handleClick}/>
    )
}

export default Logo;