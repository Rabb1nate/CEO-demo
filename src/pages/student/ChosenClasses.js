import React, { Component } from 'react';
import { Table, Tag, Space,pagination } from 'antd';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

class ChosenClasses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:30,
            currentPage:parseInt(sessionStorage.getItem("currentPage"))||"1",
            data : [
                {
                  key: '1',
                  name: 'John Brown',
                  age: 32,
                  address: 'New York No. 1 Lake Park',
                  tags: ['nice', 'developer'],
                },
                {
                  key: '2',
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 1 Lake Park',
                  tags: ['loser'],
                },
              ]
         }
         this.onPageChange=this.onPageChange.bind(this)
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state!==nextState||this.props!==nextProps){
            return true
        }
        else {
          return false
        }
    }
    onPageChange (page,pageSize) {
        console.log(page)
        let newdata = [...this.state.data]
        newdata.push({
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          })
        this.setState({
            currentPage: page,
            data:newdata
        })
        console.log(this.state.data)
        sessionStorage.setItem("currentPage",page)
        console.log("设置"+sessionStorage.getItem("currentPage"))
    }
    render() { 
        console.log(1)
        console.log(this.state.data)
        const pagination = {
            pageSize: 8,
            total:this.state.totalNum,
            onChange:this.onPageChange,
            current:this.state.currentPage,
        }
        return ( 
            <Table columns={columns} dataSource={this.state.data} pagination={pagination}/>
             );
    }
}
 
export default ChosenClasses;