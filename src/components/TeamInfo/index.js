import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'


import {  Row, Col, Button } from 'antd';
import './style.less';

class TeamInfo extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    getTeachersList(item, index){

      return (
        <Col span={12}>
          <img className='teaminfo-avatar' src={item.img} />
          <h1>{item.title}</h1>
          <h2>{item.description}</h2>
        </Col>
      )
    }
    getGroupsList(item, index){
      return (
          !!item.position ?
          <div className='teaminfo-text-section'>
          <Row key={index}>
            <Col span={12}>
              <img className='teaminfo-img' src={item.img}/>
            </Col>  
            <Col span={12}>
              <p className='teaminfo-text-title'>
                <h1>{item.title}</h1>
                <h2>{item.description}</h2>
              </p>
            </Col> 
          </Row>
          </div> :
          <div className='teaminfo-text-section'>
          <Row key={index}>
            <Col span={12}>
              <p className='teaminfo-text-title'>
                <h1>{item.title}</h1>
                <h2>{item.description}</h2>
              </p>
            </Col>
            <Col span={12}>
              <img className='teaminfo-img' src={item.img}/>
            </Col>  
          </Row>
          </div>
      )
    }
    render(){
      const teachersInfo = [{
        title: '陈雁',
        description: 'xxx',
        img: '../src/static/images/teaminfo/4.jpg',
      },{
        title: '李平',
        description: 'xxxxx',
        img: '../src/static/images/teaminfo/4.jpg',
      }]
      const groupsInfo = [{
        title: '算法',
        description: '算法算法算法',
        img: '../src/static/images/teaminfo/8.jpg',
        position: 1
      },{
        title: '前端',
        description: '前端前端前端',
        img: '../src/static/images/teaminfo/1.jpg',
        position: 0
      },{
        title: '后端',
        description: '后端后端后端后端',
        img: '../src/static/images/teaminfo/9.jpg',
        position: 1
      },{
        title: '爬虫',
        description: '爬虫爬虫爬虫爬虫',
        img: '../src/static/images/teaminfo/9.jpg',
        position: 0
      },{
        title: 'UI',
        description: 'UIUIUIUIUI',
        img: '../src/static/images/teaminfo/9.jpg',
        position: 1
      }]
        return(
            <div id='teaminfo-container'>
                  <div className='teaminfo-teacher-container'>
                    <p>
                      <h1>团队指导老师</h1>
                      <h2>Team instructor</h2>
                    </p>
                    <Row>
                      {teachersInfo.map(this.getTeachersList)}
                    </Row>
                  </div>
                  <p className='teaminfo-text-header'>
                    <h1>团队介绍</h1>
                    <h2>Team Presentation</h2>
                  </p>
                    {groupsInfo.map(this.getGroupsList)}
            </div>

        )
    }
}    
export default TeamInfo;