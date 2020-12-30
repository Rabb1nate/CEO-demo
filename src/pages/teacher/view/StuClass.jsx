  
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
                pageSize: 5,
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
        // this.handleClick = this.handleClick.bind(this);
    }
    render() { 
      return (
            <div>
                <div className="topnav">
                    <Menu theme="light"  mode="horizontal" defaultSelectedKeys="1">
                        <Menu.Item key = "1">请选择的班级</Menu.Item>
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
        this.changePage(1);
    }
    changePage = (currentPage) => {
        this.setState({
            loading:true
        })
        selectedClassTeacher(localStorage.getItem("userId"),currentPage,"5").then(
            (res) => {
              if(!res.data.flag && res.data.message === "没有登录，请先登录"){
                localStorage.clear();
                this.props.history.push('/Student/AllCompanies/ChosenClasses');
              }
                if(res.data.data!==0){
                    let pagination = {...this.state.pagination};
                    pagination.total = parseInt(res.data.page) * parseInt(pagination.pageSize);
                    this.setState({
                    contentList : res.data.data,
                    loading:false,
                    pagination
                })
                }
                console.log(res);
            },
            (err) => {
                this.setState({ loading: false })
                notification.open({
                    message: '警告',
                    placement: "bottomRight",
                    description:  '请求超时或服务器异常,请检查网络或联系管理员!',
                });
            }
        )
    }
    handleIntoClass = (text,record) => {
      //存teachclass
      localStorage.setItem('teachclass',record.teachclass);
      //重新刷新页面
      window.location.reload()
      this.props.handleDisTeach();
    }

}
export default StuClass;