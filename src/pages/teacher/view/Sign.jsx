import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Tabs, Menu } from "antd"
import SignedCom from "../components/SignedCom"
import UnsignCom from "../components/UnsignCom"
const { TabPane } = Tabs;

class Sign extends React.Component {
    constructor(props) {
        super(props)
        let signKey;
        if(localStorage.getItem("signKey")===null){
           localStorage.setItem("signKey",JSON.stringify({key:1,route:'/Teacher/Sign/Signed'}))
           
        }
        signKey = JSON.parse(localStorage.getItem("signKey"))
        this.state = {
            route:signKey.route,
            num:JSON.stringify(signKey.key)
        }
    }
    render() {
        return (
            <div>
                <div>
                    <Menu theme="light" mode="horizontal"  defaultSelectedKeys={this.state.num} style={{marginTop:-10}}>
                        <Menu.Item key="1" style={{margin:'0'}}><Link to="/Teacher/Sign/Signed" >选择缺勤的学生</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/Teacher/Sign/UnSign">缺勤学生情况</Link></Menu.Item>
                    </Menu>
                    <Switch>
                        <Route path="/Teacher/Sign/Signed" exact>
                            <SignedCom></SignedCom>
                        </Route>
                        <Route path="/Teacher/Sign/UnSign" exact>
                            <UnsignCom></UnsignCom>
                        </Route>
                    </Switch>
                     <Redirect from="/Teacher/Sign" to={this.state.route}></Redirect>
                </div>
            </div>
        )
    }
}
export default Sign;
