import React, {memo} from 'react';
import {connect} from 'react-redux'
import {Route, Link, withRouter, Switch, Redirect} from 'react-router-dom'
import Application from "./application/Application";
import Position from "./position/Position";
import WelcomeTitle from "./components/WelcomeTitle";
import {Layout, Menu} from "antd";
import {setUserId} from "./store";

const {Sider, Content} = Layout

const routes = [
  {
    path: '/CEO/application',
    name: '申请',
    component: Application
  }, {
    path: '/CEO/company',
    name: '公司',
    component: Position
  }
]

function CEO(props) {
  const {dispatch} = props

  let userId = localStorage.getItem('userId')
  let userName = localStorage.getItem('userName')
  let ceo = localStorage.getItem('ceo')
  if (!ceo && ceo !== '1') {
    props.history.replace('/')
  }
  dispatch(setUserId(userId))

  return (
    <Layout
      style={{
        height: '100vh'
      }}
    >
      <Sider
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
        }}>
        <WelcomeTitle userName={userName} userId={userId}/>
        <Menu theme="dark" selectedKeys={props.location.pathname}>
          {
            routes.map(({path, component, name}) => (
              <Menu.Item key={path}>
                <Link to={path}>
                  {name}
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Content>
        <Switch>
          {
            routes.map(({path, component: Comp}) => (
              <Route path={path} key={path}>
                {<Comp userId={userId}/>}
              </Route>
            ))
          }
          <Redirect to="/CEO/application"/>
        </Switch>
      </Content>
    </Layout>
  )
}

export default connect(null, dispatch => ({
  dispatch
}))(withRouter(CEO));
