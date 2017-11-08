import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import './style.less'

function Footer(props) {
    return (<OverPack
      playScale={0.05}
      id="footer-container"
    >
      <TweenOne
        animation={{ y: '+=30', opacity: 0, type: 'from' }}
        key="footer"
      >
        <span className='footer-text'>
          Copyright © 2017 The Project by <a href="javascript: void(0)">创数据</a>. All Rights Reserved
        </span>
      </TweenOne>
    </OverPack>);
}

export default Footer;
