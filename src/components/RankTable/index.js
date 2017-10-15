import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Table } from 'antd';


import './style.less';


class RankTable extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const columns = [{
            title: '排名',
            dataIndex: 'position',
            key: 'position',
            sorter: (a, b) => a.position - b.position,
            render: (text, record) => {
              if (text<=3) {
                return (
                <span className='rank-top-ahead' >{text}</span>
                )
              } else {
                return (
                <span>{text}</span>
                )
              }
            },
        },{
          title: '队伍名称',
          dataIndex: 'teamName',
          key: 'teamName'
        },{
          title: '最高得分',
          dataIndex: 'maxScore',
          key: 'maxScore',
        },{
          title: '最新一次得分',
          dataIndex: 'lastScore',
          key: 'lastScore',
          sorter: (a, b) => a.lastScore - b.lastScore,
        }]
        const { data, loading } = this.props;

        return(
            <div className='home-section-container'>
            <Table
            size='small'
            pagination={false}
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey="teamId"
            />


            </div>
        )
    }
}

export default RankTable;