import React from 'react'
import { Table, Button, notification,Space} from "antd"
import { showAll, setNosign} from '../../../until/api/teacherApi'
import '../../../static/style/teacherStyle.scss'
class SignedCom extends React.Component {
  constructor(props) {
    localStorage.setItem("signKey",JSON.stringify({key:1,route:'/Teacher/Sign/Signed'}))
    super(props)
    this.state = {
      teachclass: localStorage.getItem("teachclass"),
      late: "迟到",
      drop: "旷课",
      data: [],
      loading: true,
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
          title: '名字',
          dataIndex: 'name',

        },
        {
          title: '学号',
          dataIndex: 'id',

        },
        {
          title: '专业',
          dataIndex: 'major'
        },
        {
          title: '班级',
          dataIndex: 'class'
        },
        {
          title: '操作',
          dataIndex: 'agree',
          render: (text, record, index) => {


            return (
              <Space size="middle">
                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.beLate(record, index) }}>{record.agree.late}</Button>
                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.dropClass(record, index) }}>{record.agree.drop}</Button>
              </Space>
            )

          },
        },
      ]
    }
  }
  componentDidMount() {
    this.changePage(1);
  }
  changePage = (page) => {
    let lists = [];
    showAll(this.state.teachclass, page).then((res) => {
      if(!res.data.flag && res.data.message === "没有登录，请先登录"){
        localStorage.clear();
        this.props.history.push('/Student/AllCompanies/ChosenClasses');
      }
      this.setState({ loading: false });
      let rs = JSON.parse(res.data);
      for (let i = 0; i < rs.length; i++) {
        lists.push({
          "name": rs[i].userName,
          "id": rs[i].studentId,
          "major": rs[i].academy,
          "class": rs[i].cls,
          "agree": {
            read: false,
            late: '迟到',
            drop: '旷课'
          }
        })
      }
      if (rs.length !== 0) {
        let pagination = { ...this.state.pagination };
        pagination.total = rs[0].page
        console.log(this.state.pagination.total);
        this.setState({ data: lists, pagination: pagination });
        console.log(this.state.pagination.total);
      }
    }).catch(err => {
      this.setState({ loading: false })
      notification.open({
        message: '警告',
        placement: "bottomRight",
        description:
          '请求超时或服务器异常,请检查网络或联系管理员!',
      });
    })

  }
  render() {
    return (
      <div className='sign'>
        <Table 
          pagination={this.state.pagination}
          columns={this.state.columns}
          loading={this.state.loading}
          rowSelection={this.state.rowSelect}
          dataSource={this.state.data}
          rowKey={record => record.id} />
      </div>
    )
  }
  // submit = (record, selected, selectedRows, nativeEvent) => {
  // }
  // setNosign = (record, selected) => {
  //   if (record, selected) {
  //     setNosign(this.state.teachclass, record.id)
  //   }
  // }
  beLate = (record, index) => {

    setNosign("SJ00201A2031780003", record.id, 10, 1).then(rs => {
      console.log(rs.data);
      if(!rs.data.flag && rs.data.message === "没有登录，请先登录"){
        localStorage.clear();
        this.props.history.push('/Student/AllCompanies/ChosenClasses');
      }
      let res = rs.data;
      if (res.flag == true) {
        let data = this.state.data;
        data[index].agree.read = true;
        data[index].agree.late = '已迟到';
        this.setState(
          {
            data,
          }
        )
      } else {
        notification.open({
          message: '警告',
          placement: "bottomRight",
          description:
          '设置失败（已经设置该同学今天出勤状态）!',
        });
      }
    })
  }
  dropClass = (record, index) => {
    setNosign(this.state.teachclass, record.id, 10, 2).then(rs => {
      let res = rs.data
      if(!rs.data.flag && rs.data.message === "没有登录，请先登录"){
        localStorage.clear();
        this.props.history.push('/Student/AllCompanies/ChosenClasses');
      }
      console.log(rs);
      if (res.flag == true) {
        let data = this.state.data;
        data[index].agree.read = true;
        data[index].agree.drop = '已旷课';
        this.setState(
          {
            data,
          }
        )
      } else {
        notification.open({
          message: '警告',
          placement: "bottomRight",
          description:
            '设置失败（已经设置该同学今天出勤状态）!',
        })
      }
    })
  }
}
export default SignedCom;