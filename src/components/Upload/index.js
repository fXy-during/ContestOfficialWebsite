import  React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Upload, message, Button, Icon, Anchor  } from 'antd';
import PropTypes from 'prop-types';
import './style.less';


const { Link } = Anchor;
const Dragger = Upload.Dragger;
// 是否开放官网下载
const isOpen = true;
const beforeOpenInfo_download = "题目下载暂未开放，敬请等待.";
const beforeOpenInfo_uploadFile = "文件上传功能未开放.";

class UploadFile extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    handleDownLoad() {
      const downloadUrl = 'http://182.150.37.58:2017/passCheck/bigdata.zip';
      const isFF = navigator.userAgent.indexOf('Firefox')>0? true: false;
      // const 
      if (isOpen) {
        if(isFF){
          //   FF
          window.open(downloadUrl);
        } else {
        //   Edge、 chrome
          let _a = document.createElement('a');
          _a.href=downloadUrl;
          _a.download = '大数据题目.rar'
          console.log(_a);
          _a.click();
          _a=null;
        }
      } else {
        message.info(beforeOpenInfo_download);
      }
      // try{ 
      //       var elemIF = document.createElement("iframe");   
      //       elemIF.src = downloadUrl;   
      //       elemIF.style.display = "none";   
      //       document.body.appendChild(elemIF);   
      //   }catch(e){ 
      //       console.log('下载出错', e);
      //   } 
    }
    render(){
      const { mail, token, matched } = this.props;
      const options = {
        name: 'answer',
        showUploadList: true,
        action: '/dataCastle/match/answer',
        headers: {
          dataCastleMail: mail,
          dataCastleToken: token
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.file);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
          } else if (info.file.status === 'error') {
              message.error(`${info.file.name} 上传失败, ${info.file.response.msg}`);
          }
        },
      }
        return(
            <div id='context-container'>
            <div className='context-text-container'>
            <img className='context-img-pen' src='../src/static/images/pen.png' />
            <img className='context-img-disk' src='../src/static/images/Udisk.png' />

            <h1>题目描述:</h1>
            <p>银行排队系统也称之为银行排队机、叫号显示系统。<br/>
随着电子信息产品、智能产品的快速发展，以及人类生活对服务环境、服务效率的要求越来越高，尤其是在服务性行业里更是如此，因此排队系统这个概念就应运而生了。<br/> 但是在一些落后的地区，没有先进的系统支持，人们还在为了排队而烦恼。有时候看到银行门口长长的队伍，许多人就直接放弃了等待。<br/>这看似普通的现象，背后却蕴含着大量有迹可循的大道理！！！<br/>聪明的你可能会说，当一个顾客刚刚走进银行的时候，你就已经知道了他会离开所在队伍的可能性，从而选对正确的队列，减少等待。<br/>预测数据并不是凭空猜测，你肯定也需要一些数据作为你预测的佐证</p>
            </div>
            <div className='context-text-container'>
            <img className='context-img-tape' src='../src/static/images/tape.png' />
            <img className='context-img-pen2' src='../src/static/images/pen2.png' />
            <h1>下面是为本次比赛准备的数据:</h1>
            <p>数据以CSV文件格式下发<br/>每一行代表影响每一位顾客是否离开的相关信息。<br/>
数据分别存在两个文件，<br/>
第一个文件是训练集（train.csv，共2500行），用于训练你的算法或计算模型。包括八个特征和一个结果（即顾客离队率）。<br/>
第二个文件是测试集（test.csv，共500行），用于预测得出你本次比赛的结果。包括八个特征。<br/>
你计算出来的结果，即顾客离队率。（这是你要提交给我们的答案）<br/></p>
           <p><Button type='primary' onClick={this.handleDownLoad.bind(this)}>下载</Button></p>

            
            </div>
            
            <div className='context-text-container'>
            <h1>做题要求:</h1>
            <p>你可以使用任何一种编程语言来编写算法或程序。</p>
            <img className='context-img-magnifier' src='../src/static/images/magnifier.png' />
            <img className='context-img-paperclip' src='../src/static/images/paperclip.png' />
            </div>

            <div className='context-text-container'>
            <h1>判分标准:</h1>
            <img className='context-img-notebook' src='../src/static/images/notebook.png' />
            <p>本次比赛考查的是回归问题。<br/>此次采用了numpy库中的相关系数corrcoef(yEstimate,yActual)<br/>来计算你提交的结果和答案的相关性，作为评分的标准。</p>
            </div>

            <div className='context-text-container'>
            <h1>提交格式:</h1>
            <p>来自可爱的学长学姐的提醒:<br/>
            必须按照下列要求提交答案，否则视作无效的提交。后果自负。<br/>
我们要求你所提交的答案文件，为CSV文件。即文件后缀名为.csv。<br/>
            文件内容为按序排列，即你的文件的第一行数据，对应测试集的第一行的答案。请不要有任何的多余内容（甚至是空格）</p>
            </div>
            {
              !!(!!mail&&matched&&isOpen)?
              <div className='upload-container'>
                <Dragger {...options}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" style={{color: '#fff'}}/>
                  </p>
                  <p className="ant-upload-text" style={{color: '#fff'}}>点击或者将文件拖拽到这个区域即可上传文件</p>
                </Dragger>
              </div> :
              <div className='upload-tip-tologin'>
              <Anchor>
                <Link href='#layout-header-diy' title={ !isOpen ? beforeOpenInfo_uploadFile: '请在登录后或者组队后上传文件'} />
              </Anchor>
              </div>
            }
            
            </div>
        )
    }
}
UploadFile.defaultProps = {
  matched: false,
}
UploadFile.propTypes = {
  mail: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  matched: PropTypes.bool,
}
export default UploadFile;