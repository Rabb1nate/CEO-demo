import React from 'react'
import { Table, Button, notification,Space } from "antd"
import { noSign,setNosign } from '../../../until/api/teacherApi'
const columns = [
    // {
    //     title: '名字',
    //     dataIndex: 'name',

    // },
    {
        title: '学号',
        dataIndex: 'id',

    },
    // {
    //     title:'班级',
    //     dataIndex:'class'
    // },
    {
        title: '时间',
        dataIndex: 'time'
    },
    {
        title: '操作',
        dataIndex: 'agree',
        render: (text, record, index) => (
            <Button>设置为到勤</Button>
        )
    }
];
let data = [{
    name: 'lovia',
    id: '1',
    class: '1',
    time: '1'
}, {
    name: 'lovia',
    id: '2',
    class: '1',
    time: '1'
}]
class UnsignCom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teachclass: localStorage.getItem("teachclass"),
            loading: true,
            data: [],
            pagination: {
                late: "迟到",
                drop: "旷课",
                onclass:"到勤",
                showSizeChanger: false,
                pageSize:7,
                current: 1,
                total: "",
                hideOnSinglePage: true,
                onChange: (page, pageSize) => {
                    //   this.changePage(page);
                    this.state.pagination.current = page
                    console.log(this.state.pagination.current);
                }
            },
            columns: [
                // {
                //     title: '名字',
                //     dataIndex: 'name',

                // },
                {
                    title: '学号',
                    dataIndex: 'id',

                },
                {
                    title: '状态',
                    dataIndex: 'sign'
                },
                {
                    title: '时间',
                    dataIndex: 'time'
                },
                {
                    title: '操作',
                    dataIndex: 'agree',
                    render: (text, record, index) => {             
                        return (
                            <Space>
                                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.setOn(record,index) }}>{record.onclass}</Button>
                                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.setOther(record,index) }}>{record.setSign}</Button>
                            </Space>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        this.changePage();
    }
    changePage = (page) => {
        let lists = [];
        noSign(this.state.teachclass).then((res) => {
            this.setState({ loading: false });
            if (res.data.flag === false) {
                this.setState({
                    data: []
                })
                notification.open({
                    message: '提示',
                    placement: "bottomRight",
                    description:
                        '没有缺勤学生!',
                });
            } else {
                let rs = res.data.data;
                for (let i = 0; i < rs.length; i++) {
                    let sign;
                    let setsign;
                    if (rs[i].sign === 1) {
                        sign = "迟到"
                        setsign = "旷课"
                    } else if (rs[i].sign === 2) {
                        sign = "旷课"
                        setsign = "迟到"
                    }
                   
                    lists.push({
                        "id": rs[i].studentId,
                        "time": rs[i].addtime,
                        "index": i,
                        "onclass":"出勤",
                        "sign": sign,
                        "setSign":setsign,
                        "agree": {
                            read: false,
                          }
                    })
                }
                let pagination = { ...this.state.pagination };
                pagination.total = rs.length;
                this.setState({ data: lists, pagination: pagination });
                //   console.log(this.state.pagination.total);
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
            <div>
                <Table
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    rowKey={record => record.index}
                ></Table>
            </div>
        )
    }
    setOn = (record,index) => {
        setNosign(this.state.teachclass,record.id,1,0,record.time).then( rs => {
            if(rs.data.flag===true){
                let data = [...this.state.data];
                data.splice(index,1);
                this.setState({data:data})
            }else {
                notification.open({
                  message: '警告',
                  placement: "bottomRight",
                  description:
                    '设置失败!',
                })
              }
        })
    }
    setOther = (record,index) => {
        let type;
        if(record.sign === "迟到"){
            type = 2;
        }else if(record.sign === "旷课"){
            type = 1;
        }
        setNosign(this.state.teachclass,record.id,1,type,record.time).then( rs => {
            if(rs.data.flag === true){
                let data = this.state.data;
                console.log(data[index]);
                let setType;
                if(data[index].setSign === "迟到"){
                    setType = "旷课"
                }else{
                    setType = "迟到"
                }
                data[index].sign = data[index].setSign;
                data[index].setSign = setType;
                this.setState({data})
                notification.open({
                    message: '提示',
                    placement: "bottomRight",
                    description:
                        '设置成功!',
                });
            }else{
                notification.open({
                    message: '提示',
                    placement: "bottomRight",
                    description:
                        '设置失败!',
                });
            }
        })
    }
}
export default UnsignCom