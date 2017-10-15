import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Icon, Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

import './style.less';
class Category extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    handleClick(e) {
      this.props.onClickAction(e.key);
    }
    render(){
        return(
            <div className='category'>
            <Menu
              theme='dark'
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.props.current]}
              mode="horizontal">
                <MenuItem key='home'>
                  首页
                </MenuItem>
                <MenuItem key='rank'>
                  排行榜
                </MenuItem>
                <MenuItem key='about'>
                  关于我们
                </MenuItem>
            </Menu>
            </div>

        )
    }
}

export default Category;