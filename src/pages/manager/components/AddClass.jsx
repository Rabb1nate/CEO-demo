import React, { Component, Fragment } from 'react'
import { Table,notification,Space,Button } from 'antd'
import {unSelectedClassTeacher} from '../../../until/api/teacherApi'

 

class AddClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            selectedRowKeys: [],
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
            },
            columns:[
                {
                    title: '教学班',
                    dataIndex: 'teachclass',
                    key: 'teachclass'
                },
                {
                    title: '操作',
                    key: 'action',
                    align:'center',
                    render: (text, record) => (
                        <Space size="middle">
                        <Button type="primary" ghost onClick={() => {this.handleClick(text,record)}}>添加班级</Button>
                        </Space>
                    ),
                }

            ]  
        }
        this.changePage = this.changePage.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.onSelectedRowKeysChange = this.onSelectedRowKeysChange.bind(this);
        this.toBeList = this.toBeList.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectedRowKeysChange,
        };
        return(
            <Fragment>
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}  
                    rowSelection={{type:"checkbox"}}
                    rowKey={record => record.teachclass}
                    rowSelection={rowSelection}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                /> 
            </Fragment>
        )
    }
    componentDidMount(){
        this.changePage(1);
    }
    changePage = (currentPage) => {
        this.setState({
            loading:true
        })
        unSelectedClassTeacher(localStorage.getItem("teachclass"),currentPage).then(
            (res) => {
                if(res.data.data!==0){
                    let pagination = {...this.state.pagination};
                    pagination.total = parseInt(res.data.page) * parseInt(pagination.pageSize);
                    this.setState({
                    dataSource: res.data.data,
                    loading:false,
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
    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        
        if (selectedRowKeys.indexOf(record.key) >= 0) {
        //当点击选中的数据，取消选中
        selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
        //选中的数据放入数组
        selectedRowKeys.push(record.key);
        }
        this.setState({ selectedRowKeys });
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys },() => {
            console.log(selectedRowKeys);
            this.toBeList(selectedRowKeys);
        });
    }
    toBeList = (arr) => {
        console.log(1);
        let dataList = [];
        let temp = {};
        for(let i=0;i<arr.length;i++){
            temp.teacherId = localStorage.getItem("teachclass");
            console.log(arr[i]);
            temp.teachclass = arr[i];
            dataList.push(temp);
            temp = {};
        }
        console.log(dataList);
        this.props.getTeachClassList(dataList,this);
    } 

    handleClick = (text,record) => {
        let teachlist = [];
        let temp = {};
        temp.teacherId = localStorage.getItem("teachclass");
        temp.teachclass = record.teachclass;
        teachlist.push(temp)
        this.props.addClass(teachlist)
    }
}

export default AddClass