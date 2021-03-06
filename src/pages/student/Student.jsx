import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import '../../static/style/style.scss'
import AllCompanies from './AllCompanies';
import MyCompany from './MyCompany';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Detail from './Detail'
import { connect } from 'react-redux'
import changeNav from '../../until/changeNav'
import {
  Layout,
  Menu,
  Button,
  Modal,
  Input,
  Radio,
  message,
  Popover,
} from 'antd';
import actions from '../../redux/actionCreators/creators'

import {
  UserOutlined,
  VideoCameraOutlined,
  EditOutlined,
  OrderedListOutlined,

} from '@ant-design/icons';
import CEO from './CEO';


const { Header, Content, Footer, Sider } = Layout;
const options = [
  { label: '老师/管理员', value: '老师' },
  { label: '学生/CEO', value: '学生' },
];
const content = (
  <div>
    <p>请补全账号和密码</p>
  </div>
);
class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userId: '',
      password: '',
      chooseType: '老师',
      loginVisible:false
    }
    this.exit = this.exit.bind(this)
    this.loginClick = this.loginClick.bind(this)
    this.userIdchange = this.userIdchange.bind(this)
    this.passwordchange = this.passwordchange.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props || nextState!== this.state) {
      return true
    }
    else {
      return false
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {

    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  hide = () => {
    this.setState({
      loginVisible: false,
    });
  }
  exit = () => {
    this.props.Exit()
  }


  loginClick = () => {

    if (this.state.userId !== "" && this.state.password !== "") {
      this.props.login(this.state.userId, this.state.password, this.state.chooseType)


      // window.location="/CEO"
      // this.props.history.push("/CEO")
    }
    else {

      this.setState({
        loginVisible: true
      })
    }
  }
  onChange3 = e => {

    this.setState({
      chooseType: e.target.value,
    });
  };

  userIdchange(e) {
    const value = e.target.value
    this.setState({
      userId: value,
    })
  }
  passwordchange(e) {
    const value = e.target.value
    this.setState({
      password: value,
    })
  }
  UNSAFE_componentWillUpdate(newProps,newState){
    // this.setState()
    if(newProps.isLogin!==this.props.isLogin){
      try{
        if(newProps.message){
          if(newProps.isLogin === true && newProps.payload === undefined )
          message.success(newProps.message)
        }
      }
      catch{
      }
    }
  }
  componentDidUpdate(){
    if(this.props.isLogin===true){
        if (localStorage.getItem("type") === "student" && !/Student/.test(window.location) && localStorage.getItem("ceo") !== '1')
        {
          window.location = "/Student"
        }
        else if (localStorage.getItem("type") === "teacher" && !/Teacher/.test(window.location))
         {
          window.location = "/teacher"
        }
        else if (localStorage.getItem("ceo") === '1' && !/CEO/.test(window.location))
        {
         window.location = "/CEO"
       }
       if (localStorage.getItem("type") === "admin" && !/Manager/.test(window.location))
       {
         window.location = "/Manager"
       }
    }
  }

  componentDidMount() {
    let that = this
    that.props.Login_Check()
    setInterval(function () {
      if (localStorage.getItem("userId")){
        that.props.Login_Check()
    }
      else {
      }
    }, 30000)
  
  }
  render() {
    if (!this.props.isLogin)

      return (
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
            theme="light"
            width="300"
          >
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={[sessionStorage.getItem("count0") || '1']} >
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/Student/AllCompanies/ChosenClasses" onClick={changeNav.bind(this, 0, 1)}>所有公司</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/Student/Detail" onClick={changeNav.bind(this, 0, 2)}>文件</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<EditOutlined />}>
                <Link to="/Student/MyCompany" onClick={changeNav.bind(this, 0, 3)}>申请加入公司</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<OrderedListOutlined />}>
                <Link to="/Student/CEO" onClick={changeNav.bind(this, 0, 4)}>CEO</Link>
              </Menu.Item>

            </Menu>
          </Sider>
          <Layout className="site-layout"
            style={{
              marginLeft: 300,
            }}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Button className="login" type="primary" onClick={this.showModal}>登录</Button>
              <Modal
                title="登录"
                visible={this.state.visible}
                onOk={this.handleOk}
                okText="登录"
                onCancel={this.handleCancel}
                footer={
                  <Popover
                    content={<a onClick={this.hide}>确定</a>}
                    title="账号和密码不能为空"
                    trigger="click"
                    visible={this.state.loginVisible}
                    disabled={true}>
                    <Button
                      type="primary"
                      onClick={this.loginClick}
                    >登录</Button>
                  </Popover>

                }
              >
                <div className="login_input">
                  <div>
                    用户名：
      <Input
                      placeholder="学生用户名为学号"
                      onChange={this.userIdchange}
                      value={this.state.userId}
                    />
                  </div>
                  <div>
                    密码：
       <Input.Password
                      className="Input_password"
                      placeholder="初始密码为：123"
                      value={this.state.password}
                      onChange={this.passwordchange}
                    />
                  </div>
                  <Radio.Group
                    options={options}
                    onChange={this.onChange3}
                    value={this.state.chooseType}
                    optionType="button"
                  />
                  <br />
                  <br />
                  <Button>
                    忘记密码
      </Button>
                </div>
              </Modal>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', borderRadius: 10 }}>
                <Switch>
                  <Route path="/Student/AllCompanies" component={AllCompanies} />
                  <Route path="/Student/Detail" component={Detail} />
                  <Route path="/Student/MyCompany" component={MyCompany} />
                  <Route path="/Student/CEO" component={CEO} />
                  <Redirect to="/Student/AllCompanies" />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      );

    else {
      return (
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
            theme="light"
            width="300"
          >
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={[sessionStorage.getItem("count0") || '1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/Student/AllCompanies/ChosenClasses" onClick={changeNav.bind(this, 0, 1)}>所有公司</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/Student/Detail" onClick={changeNav.bind(this, 0, 2)}>文件</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<EditOutlined />}>
                <Link to="/Student/MyCompany" onClick={changeNav.bind(this, 0, 3)}>申请加入公司</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<OrderedListOutlined />}>
                <Link to="/Student/CEO" onClick={changeNav.bind(this, 0, 4)}>CEO</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout"
            style={{
              marginLeft: 300,
            }}>
            <Header className="site-layout-background Head" style={{ padding: 0 }}>

          <p className="Name">欢迎你，{localStorage.getItem("userName")}</p>
              <Button className="login" type="primary" onClick={this.exit}>
                退出登陆</Button>

            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', borderRadius: 10 }}>
              <Switch>
                  <Route path="/Student/AllCompanies" component={AllCompanies} />
                  <Route path="/Student/Detail" component={Detail} />
                  <Route path="/Student/MyCompany" component={MyCompany} />
                  <Route path="/Student/CEO" component={CEO} />
                  <Redirect to="/Student/AllCompanies" />
                </Switch>  
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userId, password, type) => {
      const action = actions.loginAction(userId, password, type)
      dispatch(action)
    },
    Login_Check: () => {

      dispatch(actions.Login_Check())
    },
    Exit: () => {

      dispatch(actions.Exit())
    }
  }
}
const mapStateToProps = state => {
  return state
}

withRouter(Student);
export default connect(mapStateToProps, mapDispatchToProps)(Student)
