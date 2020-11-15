import React, { Component, Fragment } from 'react'
import { Button } from 'antd';
import { Input } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import '../../teacher/style/ComInfo.css';
import * as Teacher from '../../../until/api/teacherApi'
// import { unSelectedClassTeacher} from '';

const { Search } = Input;

// 定义表格的行
const columns = [
  {
    title: '学号',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: '姓名',
    dataIndex: 'gender',
    width: '20%',
  },
  {
    title: '公司',
    dataIndex: 'email',
  },
  {
    title: '职位',
    dataIndex: 'email',
  },
  {
    title: '老师给分',
    dataIndex: 'email',
  },
  {
    title: '总分',
    dataIndex: 'email',
  },
  {
    title: '操作',
    dataIndex: 'email',
  }
];

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};
console.log(Teacher.unSelectedClassTeacher("hejh", 1));


const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const onSearch = value => console.log(value);

class StuInfo extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            data: [],
            pagination: {
            current: 1,
            pageSize: 30,
            },
            loading: false,
        };
    }
// 表格
  componentDidMount() {
        const { pagination } = this.state;
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        pagination,
        ...filters,
        });
    };




    render() { 
        return (
            <Fragment>
                <div>
                  <span className="title">学生信息</span>
                  <span className='stu-search'>
                      <Input placeholder="学号" className='input'/>
                      <Input placeholder="姓名" className='input'/>
                      <Button type="primary">搜索</Button>
                  </span>
                    
                    

                </div>

                <div>
                    <Table
                        columns={columns}
                        rowKey={record => record.login.uuid}
                        dataSource={this.state.data}
                        // pagination={this.state.pagination}
                        // loading={this.state.loading}
                        onChange={this.handleTableChange}
                    />
                </div>
            </Fragment>
        );
    }
}
export default StuInfo;