  
import React, { Component } from 'react';
import { Menu,Space,Button,Table } from 'antd';
import {selectedClassTeacher} from '../../../until/api/teacherApi';




class StuClass extends React.Component{ 
  constructor(props) { 
      
    
        super(props);
        this.state = {
        contentList:"",
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
        this.handleIntoClass = this.handleIntoClass.bind(this);
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
              />
        </div>
            </div>
        );

    }
    componentDidMount(){
      let repro = selectedClassTeacher(localStorage.getItem("userId"),"1","5");
      repro.then((res) => {
        this.setState({
          contentList : res.data.data,
          loading:false
        })
      },(err) => {
        console.log(err);
      })
      
    }
    handleIntoClass = (text,record) => {
      console.log(record.teachclass);
      localStorage.setItem('teachclass',record.teachclass);
      this.props.handleDisTeach();
    }
}
export default StuClass;