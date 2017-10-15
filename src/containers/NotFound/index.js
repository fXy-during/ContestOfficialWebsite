import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less';
class NotFound extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div>
                404
                <p>别乱来`</p>
            <Link to='/'> Back Home</Link><br/>
            </div>

        )
    }
}

export default NotFound;