  
import React, { Component } from 'react';
import { Menu,Space,Button,Table,notification } from 'antd';
import {selectedClassTeacher} from '../../../until/api/teacherApi';




class StuClass extends React.Component{ 
  constructor(props) { 
        super(props);
        this.state = {
        contentList:"",
        loading:true,
        btntext:"退出登录",
        columns: [
          {
            title: 'teachclass',
            dataIndex: 'teachclass',
            key: 'teachclass',
            align:"center"
          },
          {
          title: '操作',
          key: 'action',
          align:'center',
          render: (text, record) => (
            <Space size="middle">
              <Button 
                type="primary" 
                ghost 
                onClick={() => {this.handleIntoClass(text,record)}}
            >进入班级</Button>
            </Space>
            ),
          },
        ],
        pagination:{
                showSizeChanger:false,
                defaultCurrent:1,
                current: 1,
                pageSize: 7,
                total:'',
                hideOnSinglePage: true,
                onChange: (page, pageSize) => {
                console.log(this.changePage);
                this.changePage(page);
                this.state.pagination.current = page
            }
            }
      }
        this.handleIntoClass = this.handleIntoClass.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    render() { 
      return (
            <div>
                <div className="topnav">
                    <Menu theme="light"  mode="horizontal" defaultSelectedKeys="1">
                        <Menu.Item key = "1">请选择的班级</Menu.Item>
                        <Button
                          type="primary" 
                          ghost size="middle"
                          style = {{float:"right",top:"10px",right:"20px"}} 
                          onClick = {this.handleClick}
                        >{this.state.btntext}</Button>
                    </Menu>
                </div>
                <div>
                  <Table 
                    dataSource={this.state.contentList} 
                    columns={this.state.columns} 
                    rowkey={record => record.teachclass}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    locale={{filterConfirm:""}}
                    />
                </div>
            </div>
        );

    }
    componentDidMount(){
        this.setState({
          loading:true
        })
        //请求班级
        selectedClassTeacher(localStorage.getItem("userId"),"1","5").then((res) => {  
          if(res.data.data!==null){
            this.setState({
              loading:false,
              contentList : res.data.data,
              loading:false
            })
          }else{
            this.setState({
              loading:false
            })
          } 
        },() => {
          notification.success({
              description : '请求超时或服务器异常,请检查网络或联系管理员!',
              message : '警告',
              placement:'bottomRight'
            })  
        }) 
        if(localStorage.hasOwnProperty("teachclass")){
            this.setState({
              btntext:"取消选择"
            })
        }
    }
    handleIntoClass = (text,record) => {
      //存teachclass
      localStorage.setItem('teachclass',record.teachclass);
      //重新刷新页面
      window.location.reload()
      this.props.handleDisTeach();
    }

    handleClick = () => {
      if(this.state.btntext === "退出登录"){
        this.props.handleExit();
      }else if(this.state.btntext === "取消选择"){
        this.props.handleDisTeach();
      }
    }

}
export default StuClass;