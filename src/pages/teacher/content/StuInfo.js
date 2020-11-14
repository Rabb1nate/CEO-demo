import React, { Component,Fragment } from 'react'
import { Input } from 'antd';
import { Table } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import '../../teacher/style/ComInfo.css';

const { Search } = Input;

// 定义表格的行
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
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

class StuInfo extends Component { 
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
        this.fetch({ pagination });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        pagination,
        ...filters,
        });
    };

  
  
    fetch = (params = {}) => {
      this.setState({ loading: true });
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        type: 'json',
        data: getRandomuserParams(params),
      }).then(data => {
        console.log(data);
        this.setState({
          loading: false,
          data: data.results,
          pagination: {
            ...params.pagination,
            total: 200,
          },
        });
      });
    };




    render() { 
        return (
            <Fragment>
                <div>
                    <Input placeholder="Basic usage" className="input"/>
                    <Search
                    className="input-search"
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    />
                    

                </div>

                <div>
                    <Table
                        columns={columns}
                        rowKey={record => record.login.uuid}
                        // dataSource={data}
                        // pagination={pagination}
                        // loading={loading}
                        onChange={this.handleTableChange}
                    />
                </div>
            </Fragment>
        );
    }
}
export default StuInfo;