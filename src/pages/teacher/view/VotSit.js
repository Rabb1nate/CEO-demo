import React, { Component } from 'react'
import { Table, Space,Input,Button, notification,message } from 'antd'; 
import { AudioOutlined } from '@ant-design/icons';
// import '../style/VoSit.css';
import {showCeo, runCeo, closeCeo,decideCeo,deleteCeo,isRunVote} from '../../../until/api/teacherApi';
import LoginApi from '../../../until/api/LoginApi';

class VotSit extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
          btuValue: '',
          startCeo:'任命为CEO',
          isrunvote:'',
          teachclass:'',
          loading:true,
          btnloading:true,
          pagination:{
            showSizeChanger:false,
            defaultCurrent:1,
            current: 1,
            pageSize: 7,
            total:'',
            hideOnSinglePage: true,
            onChange: (page, pageSize) => {
              this.changePage(page);
              this.state.pagination.current = page
            }
          },
          columns:[
            {
              title: '姓名',
              dataIndex: 'userName',
              key: 'userName',
              align:'center'
            },
            {        
              title: '学号',
              dataIndex: 'studentId',
              key: 'studentId',
              align:'center'
            },
            {
              title: '教学班',
              dataIndex: 'teachclass',
              key: 'teachclass',
              align:'center'
            },
            {
              title: '票数',
              dataIndex: 'count',
              key: 'count',
              align:'center'
            },
            {
              title: '操作',
              key: 'action',
              align:'center',
              render: (text, record) => (
                <Space size="middle">
                  <Button type="primary" ghost onClick={() => {this.handleDecideCeo(text,record)}}>{record.action}</Button>
                </Space>
              ),
            },
          ],
          dataSource:[
          ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDecideCeo = this.handleDecideCeo.bind(this);
        this.addAction = this.addAction.bind(this);
        this.changePage = this.changePage.bind(this);
        this.isRunVote = this.isRunVote.bind(this);
    }
 
    render() { 
        return (
            <div>
                <span className="title">投票情况</span>
                <span>
                  <Button 
                    type="primary" 
                    size="middle"
                    style={{marginLeft:"75%"}}
                    onClick={this.handleChange}
                  >{this.state.btuValue}</Button>
                </span>
                
                <Table 
                  dataSource={this.state.dataSource} 
                  columns={this.state.columns} 
                  style={{marginTop:"10px"}}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  rowKey={record => record.id}
                  style={{minHeight:"370px"}}
                />
            </div>
        );
    }
    componentWillMount(){
      
    }

    componentDidMount () {
      let teachClass = sessionStorage.getItem('teachclass');
      this.setState({
        teachclass:teachClass
      },()=>{
        //展示竞选ceo的同学以及其的票数
        this.changePage(1);
        this.isRunVote();
      })
      
    }


    changePage = (currentPage) => {
      this.setState({
            loading:true
      })
      showCeo(currentPage,this.state.teachclass).then(
        (res) => {
          if(res.data.data.object.length !== 0){ 
            let pagination = {...this.state.pagination};
            pagination.total = res.data.data.totalNumber;
            this.setState({
            dataSource : res.data.data.object,
            loading:false,
            pagination
            })
            this.addAction(this.state.dataSource);
          }else{
            this.setState({
              loading:false
            })
            notification.success({
              description : '当前页面暂无数据',
              message : '提醒',
              placement:'bottomRight'
            })
          }
        },
        (err) => {
          this.setState({ loading: false })
          notification.success({
              description : '请求超时或服务器异常,请检查网络或联系管理员!',
              message : '警告',
              placement:'bottomRight'
            })
        }
      )

    }

    isRunVote = () => {
      isRunVote(this.state.teachclass).then(
        (res)=>{
          this.setState({
            isrunvote:res.data.data
          },
          ()=>{
            if(this.state.isrunvote){
              this.setState({
                btuValue:"关闭投票"
              })
            }else{
              this.setState({
                btuValue:"开启投票"
              })
            }
          })
      }, (err) =>{
      })
    }

    //开启投票\关闭投票
    handleChange = () => {
      if(this.state.isrunvote){
        this.setState({
          btnloading:false
        })
        closeCeo(this.state.teachclass).then(
        (res) => {
          this.setState({
            btuValue:"开启投票",
            isrunvote:!this.state.isrunvote,
            btnloading:true
          })
          message.success("关闭成功",1)
        },
        (err) => {
          message.success("关闭失败，清明重试",1)
        }
      )
      }else if(!this.state.isrunvote){
        this.setState({
          btnloading:false
        })
        runCeo(this.state.teachclass).then(
        (res) => {
          this.setState({
            btuValue:"关闭投票",
            isrunvote:!this.state.isrunvote,
            btnloading:true
          })
          message.success("开启成功",1)
        },
        (err) => {
        }
        )
      }
    }
    
    //任命为CEO
    handleDecideCeo = (text,record) => {
      if(record.action == "任命为CEO"){
        record.action = "取消为CEO"
        this.setState({
          dataSource: this.state.dataSource
        })
        decideCeo(record.studentId).then(
          (res) => {
            message.success("任命成功",1);
          },(err) => {
            message.warn("任命失败，请重试",1);
          }
        )
      }else{
        
        
        //取消为CEO
        deleteCeo(record.studentId).then(
          (res) => {
            if(res.data.flag){
              message.success("取消成功");
              record.action = "任命为CEO";
              this.setState({
                  dataSource: this.state.dataSource
              }) 
            }else if(!res.data.flag){
              message.warn(res.data.message,1);
            }

          },(err) => {
          }
        )
        

      }
    }

    //为dataSource增加action
    addAction = (dataSource) => {
      let action;
      for(let i = 0;i<dataSource.length;i++){
        if(dataSource[i].state == 0){
          action = '任命为CEO';
        }
        else if(dataSource[i].state == 1){
          action = '取消为CEO';
        }
        dataSource[i].action = action;
      }
      this.setState({
          dataSource:dataSource
        })
    }

    
}
export default VotSit;