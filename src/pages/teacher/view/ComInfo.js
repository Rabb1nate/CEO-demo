import React, { Component, Fragment } from 'react'
import { Button } from 'antd';
import { Input } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import '../../teacher/style/StuInfo.css';

const { Search } = Input;


const columns = [
  {
    title: '公司人数',
    dataIndex: 'name',
    // sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '40%',
  },
  {
    title: '公司得分',
    dataIndex: 'gender',
    width: '40%',
  },
  {
    title: '操作',
    dataIndex: 'email',
  },
];

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};



const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const onSearch = value => console.log(value);


class ComInfo extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            data: [],
            pagination: {
            current: 1,
            pageSize: 10,
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
                    <span className='title'>公司信息</span>
                    <span className='com-search'>
                        <Input placeholder="公司名称" className="input" />
                        <Button type="primary">搜索</Button>
                    </span>
                </div>

                <div>
                    <Table
                        columns={columns}
                        rowKey={record => record.login.uuid}
                        // dataSource={this.state.data}
                        // pagination={this.state.pagination}
                        // loading={this.state.loading}
                        onChange={this.handleTableChange}
                    />
                </div>
            </Fragment>
        );
    }
}
export default ComInfo;