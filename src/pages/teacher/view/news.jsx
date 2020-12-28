import React from 'react'
import { changeCompanyName, agreeChange, rejectChange } from '../../../until/api/teacherApi'
import { Table, Space, Button, notification, Input, Select } from 'antd'
import '../../../static/style/teacherStyle.scss'
const { Search } = Input
const { Option } = Select;
class newLists extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      teachclass: localStorage.getItem("teachclass"),
      select: "name",
      value: "",
      loading: true,
      data: [],
      pagination: {
        showSizeChanger: false,
        pageSize: 7,
        current: 1,
        total: "",
        hideOnSinglePage: true,
        onChange: (page, pageSize) => {
          this.changePage(page);
          this.state.pagination.current = page
          console.log(this.state.pagination.current);
        }
      },
      columns: [
        {
          title: '申请人姓名',
          dataIndex: 'name',
        },
        {
          title: '申请人学号',
          dataIndex: 'id'
        },
        {
          title: '原公司名',
          dataIndex: 'message',
        },
        {
          title: '修改后公司名',
          dataIndex: 'error',
        },
        {
          title: '操作',
          dataIndex: 'agree',
          render: (text, record, index) => (
            <Space size="middle">
              <Button size="small" type="primary" ghost onClick={() => { this.clickAgree(text, record, index) }}>同意</Button>
              <Button size="small" danger="true" onClick={() => { this.clickReject(text, record, index) }}>拒绝</Button>
            </Space>
          ),
        },
      ],

    }
  }
  render() {
    return (
      <div id="news">
        <div>
          <p  className='title'>消息</p>
          {/* <Select defaultValue="name" style={{ width: 100 }} >
            <Option value="name">学生姓名</Option>
            <Option value="id">学生学号</Option>
          </Select>
          <Search
            placeholder="请输入搜索信息"
            enterButton="搜索"
            style={{ width: 200, marginBottom: 10 }}
            onChange={(e) => { this.inputChange(e) }}
            value={this.state.value}
          ></Search> */}
        </div>
        <div className="header">
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            rowKey="index"
          />
        </div>
      </div>
    )

  }
  clickAgree = (text, record, index) => {
    // let newData = [...this.state.data];
    // let pagination = {...this.state.pagination};
    // pagination.total = pagination.total-1;
    // newData.splice((this.state.pagination.current-1)*this.state.pagination.pageSize+index,1);
    // this.setState({
    //   data:newData,
    //   pagination:pagination
    // })

    //直接用 this.state.pagination.current 调用数据？
    console.log(record);//这是这一行的数据
    // console.log(store.getState());
    agreeChange(record.id, record.error).then((rs) => {
      let res = rs.data;
      console.log(res);
      if (res.flag === true) {
        console.log(this.state.pagination.current);
        this.changePage(this.state.pagination.current)
        notification.open({
          message: '提示',
          placement: "bottomRight",
          description:
            '同意改名成功!',
        });

      } else {
        notification.open({
          message: '提示',
          placement: "bottomRight",
          description:
            '同意改名失败!',
        })
      }
    })

  }
  clickReject = (text, record, index) => {
    rejectChange(record.id, record.error).then((rs) => {
      let res = rs.data;
      console.log(res);
      if (res.flag === true) {
        notification.open({
          message: '提示',
          placement: "bottomRight",
          description:
            '拒绝改名成功!',
        });
      } else {
        notification.open({
          message: '提示',
          placement: "bottomRight",
          description:
            '拒绝改名失败!',
        });
      }
    })
    this.changePage(this.state.pagination.current)
  }
  componentDidMount() {
    // this.setState({
    //   data:[{
    //     name:1,
    //     message:1,
    //     error:1
    //   },
    //   {
    //     name:2,
    //     message:1,
    //     error:1
    //   },{
    //     name:3,
    //     message:1,
    //     error:1
    //   },{
    //     name:4,
    //     message:1,
    //     error:1
    //   },{
    //     name:5,
    //     message:1,
    //     error:1
    //   }],
    //   loading:false,
    // })
    this.changePage(1)
  }
  changePage = (page, news) => {
    let lists = [];
    let newPage = page;
    // if(page===0){
    //   newPage = 1;
    // }
    changeCompanyName(this.state.teachclass, newPage, "1").then(
      res => {
        this.setState({ loading: false })
        let rs = JSON.parse(res.data);
        if (rs.length === 0) {
          this.setState({
            data: []
          })
        } else {
          for (let i = 0; i < rs.length; i++) {
            lists.push({
              "message": rs[i].message,
              "error": rs[i].error,
              "name": rs[i].data.userName,
              "id": rs[i].data.userId,
              "index": i
            })
          }
          let pagination = { ...this.state.pagination };
          pagination.total = rs[0].page
          this.setState({ data: lists, pagination: pagination });
          console.log(this.state.data);
        }

      }).catch(err => {
        console.log(err)
        this.setState({ loading: false })
        notification.open({
          message: '警告',
          placement: "bottomRight",
          description:
            '请求超时或服务器异常,请检查网络或联系管理员!',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      })
  }
  search = () => {
    if (this.state.select == "id") {

    } else if (this.state.select == "name") {

    }
    //根据value调用接口 搜索 改变data的值
  }
  inputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
}
export default newLists


