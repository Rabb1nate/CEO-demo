import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { Tabs, Menu } from "antd"
import SignedCom from "../components/SignedCom"
import UnsignCom from "../components/UnsignCom"
const { TabPane } = Tabs;

class Sign extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div>
                    <Menu theme="light" mode="horizontal"  defaultSelectedKeys="1" style={{marginTop:-10}}>
                        <Menu.Item key="1" style={{margin:'0'}}><Link to="/Teacher/Sign" >选择缺勤的学生</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/Teacher/Sign/UnSign">缺勤学生情况</Link></Menu.Item>
                    </Menu>
                    <Switch>
                        <Route path="/Teacher/Sign" exact>
                            <SignedCom></SignedCom>
                        </Route>
                        <Route path="/Teacher/Sign/UnSign" exact>
                            <UnsignCom></UnsignCom>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}
export default Sign;
