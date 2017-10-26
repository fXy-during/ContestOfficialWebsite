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
    // 格式化教师信息
      const titleInfo = item.title.split(/\n/).filter(item => item).map((item, index)=>(
        <h1>{item.trim()}</h1>))

      const descriptionInfo = item.description.split(/\n/).filter(item => item)
        .map((item, index) => (
          <h2>{item.trim()}</h2>))

      return (
        index%2 === 0 ?
        <div className='teachers-text-section'>
        <Row >
          <Col span={12}>
            <img className='teaminfo-avatar' src={item.img} />
          </Col>
          <Col span={12}>
            <p className='teachers-text-wrap textLeft'>
            <p className={`teacherTitle-${index}`}>{titleInfo}</p>
              {descriptionInfo}
            </p>
          </Col>
        </Row> 
        </div> :
        <div className='teachers-text-section'>
        <Row >
          <Col span={12}>
            <p className='teachers-text-wrap textRight'>
              <p className={`teacherTitle-${index}`}>{titleInfo}</p>
              {descriptionInfo}
            </p>
          </Col>
          <Col span={12}>
            <img className='teaminfo-avatar' src={item.img} />
          </Col>
        </Row>
        </div>
      )
    }
    // 格式化组内信息
    getGroupsList(item, index){
        const descriptionInfo = item.description.split(/\n/).filter(item => item)
        .map((item, index) => (
          <h2>{item.trim()}</h2>
          ))
      return (
          index%2 === 0 ?
          <div className='teaminfo-text-section'>
          <Row key={index}>
            <Col span={12}>
              <img className='teaminfo-img' src={item.img}/>
            </Col>  
            <Col span={12}>
              <p className='teaminfo-text-wrap' >
                <h1>{item.title}</h1>
                {descriptionInfo}
              </p>
            </Col> 
          </Row>
          </div> :
          <div className='teaminfo-text-section'>
          <Row key={index}>
            <Col span={12}>
              <p className='teaminfo-text-wrap'>
                <h1>{item.title}</h1>
                {descriptionInfo}
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
      const teachersInfo = [
      {
        title: ``,
        description: `西南石油大学特聘教授
        电子科技大学与德国波茨大学联合培养博士
        香港理工大学博士后，四川省学术带头人后备人选
        四川省计算机学会/中国计算机学会/ACM高级会员
        四川省计算机学会大数据专委会委员,校级青年科技创新团队负责人
        香港城市大学，清华大学(计算机系张钹院士)访问学者
        具有多年网络科学及机器学习研究经验，先后主持并合作参与国家自然科学基金等高水平科研项目多项
        申请有关数据数理、算法等发明专利10余项`,
        img: '../src/static/images/teachers/Li_.png',
      },{
        title: ``,
        description: `西南石油大学副教授
        西南石油大学石油工程与计算专业博士
        美国劳伦斯理工大学访问学者
        中国计算机学会/ACM会员，四川省计算机学会大数据专委会委员
        具有多年网络科学及机器学习研究经验
        先后主持并合作参与数据分析相关国家自然科学基金等高水平科研项目多项，申请发明专利20余项`,
        img: '../src/static/images/teachers/Chen_.png',
      },{
        title: ``,
        description: `西南石油大学计算机科学学院教师
        主要从事复杂网络建模、网络传播动力学、数据挖掘等方面的研究
        2011-2016年在电子科技大学攻读博士学位，2017年至今电子科技大学博士后研究员
        2015年受国家留基委国家建设高水平大学公派博士生项目资助在奥地利进行博士联合培养1年
        在Scientifi Reports,Physical Review E, Physica A, Chaos等国际主流期刊发表SCI论文多篇
        第一作者论文他引50次，影响因子合计15.024。多次参加复杂网络领域国际和国内会议并作报告`,
        img: '../src/static/images/teachers/Liu_.png',
      },{
        title: '',
        description: `主研企业信息化、数据挖掘与商务智能、交通信息化
        主持厅局级项目3项，校级项目2项
        总体负责或参与20余项信息化规划、物流规划等项目
        2016-2017在清华大学访问，主攻数据挖掘
        发表国内外学术论文15篇，EI 2篇，CSCD 1篇，参编多本教材
        参与宜昌三峡物流园信息平台方案荣获2012中国物流与采购联合会科技进步奖三等奖
        2015年作为首届“互联网+”创新创业比赛评委和指导老师，学生荣获省级银奖
        组织负责多届全国电子商务“创意、创新、创业”挑战赛并担任省赛评委`,
        img: '../src/static/images/teachers/Zhong_.png',
      }];
      const groupsInfo = [{
        title: '算法',
        description: `创数据算法组是一个旨在培养本科算法人才的小组,
        主要学习方向是机器学习，应用领域：舆情分析、数据挖掘、大数据计算以及自然语言处理等方面。
        扎实的数学基础，踏实的学习态度和一颗热爱数学、热爱算法的心是学习算法的必要条件，
        And If you are the one, come and join us!`,
        img: '../src/static/images/teaminfo/Algorithm.jpg',
      },{
        title: '前端',
        description: ` 团队前端组主要负责项目前端搭建, 对数据进行可视化处理, 侧重平台的开发, 维护上线项目。
        不骄不躁、保持一颗真诚学习的心同样是前端学习必备要求。
        stay hungery，stay foolish.
        你是那个热爱前端，有想法有抱负的童鞋吗？ 赶快加入我们吧`,
        img: '../src/static/images/teaminfo/FrontEnd.jpg',
        //
      },{
        title: '后端',
        description: `后端开发，是面向服务端编程，负责项目功能的具体实现。
        后端开发最底层就是对数据库的增删查改，
        我们将功能进行逻辑分析后拆分成一次次对数据库的操作，再将它们结合起来进行逻辑处理。
        我们对思维逻辑和编程能力的要求有着较高的要求。
        我们很重要，因为我们直接作用于服务器和数据库。`,
        img: '../src/static/images/teaminfo/Tomcat.jpg',
      },{
        title: '爬虫',
        description: `网络爬虫是一种按照一定的规则，自动的抓取万维网信息的程序或脚本，
        在大数据时代，数据采集是进行数据分析的第一步，
        在我们实验室里，你将有机会通过实战抓取数据，运用数据。`,
        img: '../src/static/images/teaminfo/Reptile.jpg',
      },{
        title: 'UI',
        description: `UI是对软件的人机交互、操作逻辑、界面美观的整体设计。
        熟练掌握Adobe的相关工具 PS AI AE等等。
        我们通过各种软件学习插画 AE动效 网页界面等。
        来我们实验室，你可以体会设计的乐趣。`,
        img: '../src/static/images/teaminfo/UI.png',
      }]
        return(
            <div id='teaminfo-container'>
                  <div className='teaminfo-text-header'>
                    <p>
                      <h1>团队指导老师</h1>
                      <h2>Team instructor</h2>
                    </p>
                    {teachersInfo.map(this.getTeachersList)}
                  </div>
                  <p className='teaminfo-text-header'>
                    <p>
                      <h1>团队介绍</h1>
                      <h2>Team Presentation</h2>
                    </p>
                  </p>
                    {groupsInfo.map(this.getGroupsList)}
            </div>

        )
    }
}    
export default TeamInfo;