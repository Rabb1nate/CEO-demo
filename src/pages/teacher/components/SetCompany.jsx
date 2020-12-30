import React from 'react'
import { InputNumber, Button, notification, Spin } from 'antd'
import '../../../static/style/teacherStyle.scss'
import { showConfig, updateConfigCompany } from '../../../until/api/teacherApi'

class SetCompany extends React.Component {
    constructor(props) {
        localStorage.setItem("setKey",JSON.stringify({key:2,route:'/Teacher/Set/Company'}))
        super(props)
        this.state = {
            title: [{ "title": "老师给普通企业", "name": "companyScore", "value": "" }, { "title": "新闻机构", "name": "newsScore", "value": "" }, { "title": "银行", "name": "bankScore", "value": "" }, { "title": "会计事务所:", "name": "accountScore", "value": "" }, { "title": "工商局", "name": "tradeScore", "value": "" }, { "title": "税务局:", "name": "revenueScore", "value": "" }, { "title": "老师给机构", "name": "agencyScore", "value": "" }, { "title": "企业互评给机构", "name": "fromCompanyScore", "value": "" }],
            teachclass: localStorage.getItem("teachclass"),
            loading: true,
            data: [],
        }
    }
    render() {
        let list1 = this.state.title.map((item, index) => {
            if(index < 6) {
                return (
                    <div className="item" key={index}>
                        <span className="name">{item.title}打分占比:</span>
                        <InputNumber min={0} max={1} step={0.1} value={item.value} onChange={(number) => this.change(number, index)} />
                    </div>
                )
            }
            else{
                return " "
            }
        })
        let list2  = this.state.title.map((item,index) => {
            if(index>5){
                return (
                    <div className="item" key = {index}>
                        <span className="name">{item.title}打分占比:</span>
                        <InputNumber min={0} max={1} step={0.1} value={item.value} onChange={(number) => this.change(number, index)} />
                    </div>
                )
            }else{
                return " "
            }
        })
        return (
            <Spin spinning={this.state.loading}>
                <div className="setChild">
                    <div className="setCompany">
                        <div>
                            {list1}
                          
                        </div>
                        <div>
                            {list2}
                        </div>

                    </div>
                    <Button className="submit" onClick={() => this.submit()}>修改</Button>
                    <div className="notice">注意:每一列占比和要为1!</div>
                </div>
            </Spin>
        )
    }
    componentDidMount() {
        showConfig(this.state.teachclass).then(rs => {
            if(!rs.data.flag && rs.data.message === "没有登录，请先登录"){
                localStorage.clear();
                this.props.history.push('/Student/AllCompanies/ChosenClasses');
              }
            console.log(rs);
            if (rs.data.flag === true) {
                let res = rs.data.data
                let title = [...this.state.title];
                title[0].value = res.companyScore;
                title[1].value = res.newsScore;
                title[2].value = res.bankScore;
                title[3].value = res.accountScore;
                title[4].value = res.tradeScore;
                title[5].value = res.revenueScore;
                title[6].value = res.agencyScore;
                title[7].value = res.fromCompanyScore;
                console.log(title);
                console.log(rs.data);
                this.setState({
                    title: title,
                    loading: false
                })

            } else {
                notification.open({
                    message: '警告',
                    placement: "bottomRight",
                    description:
                        '请求超时或服务器异常,请检查网络或联系管理员!',
                });
            }

        })
    }
    change = (value, index) => {
        let title = [...this.state.title]
        console.log(title);
        console.log(index);
        console.log(value);
        title[index].value = value
        this.setState({
            title
        })
    }
    submit = () => {
        updateConfigCompany(this.state.title[0].value,this.state.title[1].value,this.state.title[2].value,this.state.title[3].value,this.state.title[4].value,this.state.title[5].value,this.state.title[6].value,this.state.title[7].value,this.state.teachclass).then(rs => {
            if(!rs.data.flag && rs.data.message === "没有登录，请先登录"){
                localStorage.clear();
                this.props.history.push('/Student/AllCompanies/ChosenClasses');
              }
            if (rs.data.flag === true) {
                notification.open({
                    message: '提示',
                    placement: "bottomRight",
                    description:
                        '修改成功!',
                });

            } else if (rs.data.flag === false) {
                notification.open({
                    message: '提示',
                    placement: "bottomRight",
                    description:
                        '修改失败（占比总和不为1）！',
                });
            }
        })
    }
}
export default SetCompany