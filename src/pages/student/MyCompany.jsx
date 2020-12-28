import React, { Component } from 'react';
import { withRouter , Switch  } from 'react-router-dom'
import WriteWant from './WriteWant';
import Join from './Join'
import {HashRouter as Router, Route,Link,Redirect} from 'react-router-dom';
import {  Menu } from 'antd';
import changeNav from '../../until/changeNav'
class MyCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }
    render() { 
        return ( 
            
            <div className="table_div">
        <Menu selectedKeys={[sessionStorage.getItem("count1") || '1']} mode="horizontal">
        <Menu.Item key="1" >
                <Link to="/Student/MyCompany/Join" onClick={changeNav.bind(this, 1, 1)}>我的申请</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/Student/MyCompany/WriteWant" onClick={changeNav.bind(this, 1, 2)}>申请加入公司</Link>
              </Menu.Item>
        </Menu>
        <Switch>
                  <Route path="/Student/MyCompany/Join" component={Join} />
                  <Route path="/Student/MyCompany/WriteWant" component={WriteWant} />
                  <Redirect to="/Student/MyCompany/Join" />
                </Switch>
                </div>
         );
    }
}

export default withRouter(MyCompany)