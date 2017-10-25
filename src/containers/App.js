import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import enUS from 'antd/lib/locale-provider/en_US';
// import { LocaleProvider } from 'antd';
// import enUS from 'antd/lib/locale-provider/en_US';


import '../static/style/common.less';
class App extends React.Component { 
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false,
        }
    }
    componentDidMount() {

        this.setState({
            initDone: true
        })
    }
    render() { 
        return ( 
            <div>
            {   this.state.initDone?
                this.props.children:
                 <div>加载中...</div>
            }
            </div>
        ) 
    } 
}
            // <LocaleProvider locale={enUS}>
            // </LocaleProvider>
export default App
