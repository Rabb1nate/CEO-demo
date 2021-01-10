import React from 'react'
import SetCompany from '../components/SetCompany'
import SetPersonal from '../components/SetPersonal'
import SetOther from '../components/SetOthers'
import { Tabs, Menu } from 'antd'
import { showConfig } from '../../../until/api/teacherApi'
import {
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
class Set extends React.Component {
    constructor(props) {
        super(props)
        if(sessionStorage.getItem("setKey")===null){
            sessionStorage.setItem("setKey",JSON.stringify({key:1,route:'/Teacher/Set/Person'}))
         }
         let setKey = JSON.parse(sessionStorage.getItem("setKey"))
        this.state = {
            route:setKey.route,
            num:JSON.stringify(setKey.key),
            person: "",
            company: "",
            other: "",
            teachclass: sessionStorage.getItem("teachclass")
        }
    }
    render() {
        return (
            <div className="set" style={{minHeight:'390px'}}>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={this.state.num} style={{ marginTop: -10 }}>
                    <Menu.Item key="1" style={{margin:'0'}}><Link to="/Teacher/Set/Person">个人成绩占比</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/Teacher/Set/Company">公司成绩占比</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/Teacher/Set/Other">其他占比</Link></Menu.Item>
                </Menu>
                <Switch>
                    <Route path="/Teacher/Set/Person">
                        <SetPersonal person={this.state.person}></SetPersonal>
                    </Route>
                    <Route path="/Teacher/Set/Company">
                        <SetCompany></SetCompany>
                    </Route>
                    <Route path="/Teacher/Set/Other">
                        <SetOther></SetOther>
                    </Route>
                </Switch>
                <Redirect from="/Teacher/Set" to={this.state.route}></Redirect>
                {/* <Tabs defaultActiveKey="1" size="middle" style={{ marginTop: -10 }}>
                    <TabPane tab="个人成绩占比" key="1">
                        <SetPersonal></SetPersonal>
                    </TabPane>
                    <TabPane tab="公司成绩占比" key="2">
                        <SetCompany></SetCompany>
                    </TabPane>
                    <TabPane tab="其他占比" key="3">
                        <SetOther></SetOther>
                    </TabPane>
                </Tabs> */}

            </div>

        )
    }
    componentDidMount() {
        showConfig(this.state.teachclass).then(rs => {
            let res = rs.data.data
            this.setState({
                ceoScore: res.ceoScore,
                memberScore: res.memberScore,
                signScore: res.signScore
            })

        })
    }
}
export default Set