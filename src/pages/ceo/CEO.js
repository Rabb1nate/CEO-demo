import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import File from "./views/file";
import Application from "./views/application";
import Company from "./views/company";
import Router from "./components/Router";
import WelcomeTitle from "./components/WelcomeTitle";
import NavMenu from './components/NavMenu'

import {Layout} from "antd";
import {setUserId} from "./store";

const {Sider, Content, Header} = Layout

const routes = [
  {
    path: '/CEO/application',
    name: '申请',
    component: Application
  }, {
    path: '/CEO/company',
    name: '公司',
    component: Company
  }, {
    path: '/CEO/file',
    name: '文件',
    component: File
  }
]

function CEO(props) {
  const {dispatch, history} = props

  let userId = localStorage.getItem('userId')
  let userName = localStorage.getItem('userName')
  let teachclass = localStorage.getItem('class')
  let ceo = localStorage.getItem('ceo')
  if (!ceo && ceo !== '1') {
    // history.replace('/')
  }
  dispatch(setUserId(userId))

  return (
    <Layout
      style={{
        height: '100vh'
      }}
    >
      <Sider
        theme="light"
        style={{
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0
        }}
        width={300}
      >
        <NavMenu routes={routes}/>
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            boxShadow: '0 0 15px #d3d3d3'
          }}>
          <WelcomeTitle userName={userName} userId={userId}/>
        </Header>
        <Content>
          <Router routes={routes} userId={userId} teachclass={teachclass}/>
        </Content>
      </Layout>

    </Layout>
  )
}

export default connect(null, dispatch => ({
  dispatch
}))(withRouter(CEO));
