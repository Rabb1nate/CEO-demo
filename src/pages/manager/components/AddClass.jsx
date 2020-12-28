import React, { Component, Fragment } from 'react'
import { Table,notification } from 'antd'
import {unSelectedClassTeacher} from '../../../until/api/teacherApi'

 
const columns = [
                {
                    title: '教学班',
                    dataIndex: 'teachclass',
                    key: 'teachclass'
                }
            ]

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
                pageSize: 5,
                total:'',
                hideOnSinglePage: true,
                onChange: (page, pageSize) => {
                console.log(this.changePage);
                this.changePage(this.props.teacherId,page);
                this.state.pagination.current = page
            }
            }  
        }
        this.changePage = this.changePage.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.onSelectedRowKeysChange = this.onSelectedRowKeysChange.bind(this);
        this.toBeList = this.toBeList.bind(this);
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
                    columns={columns}  
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
        console.log(this.props);
        this.changePage(localStorage.getItem("teachclass"),1);
    }
    changePage = (teacherId,currentPage) => {
        this.setState({
            loading:true
        })
        unSelectedClassTeacher(teacherId,currentPage).then(
            (res) => {
                if(res.data.data!==0){
                    this.setState({
                    dataSource: res.data.data,
                    loading:false
                })
                }
                
                console.log(res);
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
            this.toBeList();
        });
    }
    toBeList = () => {
        let dataList = [];
        let temp = {};
        for(let i=0;i<this.state.selectedRowKeys.length;i++){
            temp.teacherId = localStorage.getItem("teachclass");
            console.log(this.state.selectedRowKeys[i]);
            temp.teachclass = this.state.selectedRowKeys[i];
            dataList.push(temp);
            temp = {};
        }
        console.log(dataList);
        this.props.getTeachClassList(dataList,this);
    } 
}

export default AddClass