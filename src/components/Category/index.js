import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Icon, Menu } from 'antd';
import PropType from 'prop-types'

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
            <div id='category'>
            <Menu
              style={{backgroundColor: '#4fbab4', borderBottomColor: '#4fbab4', color: '#fff' }}
              theme='light'
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.props.current]}
              mode="horizontal">
                <MenuItem key='home'>
                  Home
                </MenuItem>
                <MenuItem key='rank'>
                  subject&Rank
                </MenuItem>
                <MenuItem key='about'>
                  AboutUs
                </MenuItem>
            </Menu>
            </div>
        )
    }
}
Category.defaultProps = {
  current: 'home',
}

Category.propTypes = {
  // 分页内容
  current: PropType.oneOf(['home', 'rank', 'about']),
  // 换页
  onClickAction: PropType.func.isRequired,
}
export default Category;