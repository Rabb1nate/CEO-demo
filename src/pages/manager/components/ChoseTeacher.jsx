import React, { Component, Fragment } from 'react'
import { Table, Button, Space,notification} from 'antd'
import ManagerApi from '../../../until/api/managerApi.js'
import {Link} from "react-router-dom";

class ChoseTeacher extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'userName',
                    key: 'userName',
                    align: "center",
                    width: "30%"
                },
                {
                    title: '系别',
                    dataIndex: 'discipline',
                    key: 'discipline',
                    align: "center",
                    width: "40%"
                },
                {
                    title: '操作',
                    key: 'action',
                    dataIndex:"uesrId",
                    align:'center',
                    render: (text, record) => (
                        <Space size="middle">
                           <Button type="primary" ghost onClick={() => {this.handleClick(text,record)}}>
                                进入该班级
                            </Button>
                        </Space>
                    )
                }
            ],
            dataSource:[],
            teacherId:'',
            teacherName:'',
            loading:true,
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
        this.handleClick = this.handleClick.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    render() {
        return(
            <Fragment>
                <span className="Nav-top">选择老师</span>
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}  
                    style = {{marginTop:'10px'}}
                    pagination={this.state.pagination}
                    rowKey={record => record.userId}
                    loading={this.state.loading}
                />
            </Fragment>
        )
    }

    handleClick = (text,record) => {
        console.log(record.userId);
        localStorage.setItem('teachclass',record.userId);
        localStorage.setItem('teachName',record.userName);
        this.setState({
        },()=>{
            this.props.history.push({
            pathname: '/Manager/ChoseClass/MenuClass',
            });
        })
        
    }

    componentDidMount (){
        this.changePage(1);
    }
    changePage = (currentPage) => {
        this.setState({
            loading:true
        })
       ManagerApi.showTeacher(currentPage).then(
            (res) => {
                if(!res.data.flag && res.data.message === "没有登录，请先登录"){
                    localStorage.clear();
                    this.props.history.push('/Student/AllCompanies/ChosenClasses');
                  }
                let list = JSON.parse(res.data);
                if(list.length !== 0){
                    let pagination = {...this.state.pagination};
                    pagination.total = list[0].count;
                    this.setState({
                        loading:false,
                        dataSource: list,
                        pagination
                    })
                }
            },
            (err) => {
                this.setState({ loading: false })
                notification.open({
                    message: '警告',
                    placement: "bottomRight",
                    description:
                    '请求超时或服务器异常,请检查网络或联系管理员!',
                });
            }
        )
    }
}

export default ChoseTeacher;