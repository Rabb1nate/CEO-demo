import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ComInfo from './ComInfo';
import StuInfo from './StuInfo';
import VotSit from './VotSit';
import NewsCom from './news';
import SignCom from './Sign'
import SetCom from './Set'
import StuClass from './StuClass';
import Download from './Download';
import '../../teacher/style/contentNav.css';
import {  Menu,Button,message,Modal } from 'antd';
import LoginApi from '../../../until/api/LoginApi'
import {
    UserOutlined, VideoCameraOutlined,
    EditOutlined, OrderedListOutlined, CarryOutOutlined,
    FolderOpenOutlined,SettingOutlined,BarsOutlined 
} from '@ant-design/icons';

class Teacher extends Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            userid:" ",
            username:"",
            isModalVisible:false,
            isMask:false,
            btntext:"退出登录"
          }
        this.handleDisTeach = this.handleDisTeach.bind(this);
        this.handleExit = this.handleExit.bind(this);
        // this.isLogin = this.isLogin.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <div>
                <Router>
                    <div id="All">
                        <div className="nav-div">
                            <div className="login">
                                <span >欢迎您,{this.state.username}</span>
                                <Button 
                                    type="primary" 
                                    ghost size="small" 
                                    style={{marginLeft:'15px'}}
                                    onClick = {this.handleExit}
                                >退出登录</Button>
                            </div>
                            <Menu theme="light" mode="inline">
                                <Menu.Item key="1" icon={<UserOutlined />}>
                                    <Link to="/Teacher/StuInfo">学生信息</Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<BarsOutlined />}>
                                    <Link to="/Teacher/ComInfo">公司情况</Link> 
                                </Menu.Item>
                                <Menu.Item key="3" icon={<EditOutlined />}>
                                    <Link to="/Teacher/VotSit">投票情况</Link> 
                                </Menu.Item>
                                <Menu.Item key="4" icon={<OrderedListOutlined />}>
                                    <Link to="/Teacher/News">消息</Link> 
                                </Menu.Item>
                                <Menu.Item key="5" icon={<CarryOutOutlined />}>
                                    <Link to="/Teacher/Sign">签到</Link> 
                                </Menu.Item>
                                <Menu.Item key="6" icon={<SettingOutlined />}>
                                    <Link to="/Teacher/Set">修改配置</Link> 
                                </Menu.Item>
                                <Menu.Item key="7" icon={<FolderOpenOutlined />}>
                                    <Link to="/Teacher/Download">查看上传文件</Link> 
                                </Menu.Item>
                            </Menu>
                            
                            <Button 
                                    type="primary" 
                                    ghost size="middle" 
                                    style={{width:"180px",marginTop:"20px"}}
                                    onClick={this.changeClass}
                                >更改班级</Button>
                        </div>

                                <div className="content">
                                <Switch>
                                    <Route exact path="/Teacher/StuInfo">
                                        <StuInfo/>
                                    </Route>
                                    <Route path="/Teacher/ComInfo">
                                        <ComInfo/>
                                    </Route>
                                    <Route path="/Teacher/VotSit">
                                        <VotSit/>
                                    </Route>
                                    <Route path="/Teacher/News">
                                        <NewsCom/>  
                                    </Route> 
                                    <Route path="/Teacher/Sign">
                                        <SignCom />  
                                    </Route>
                                    <Route path="/Teacher/Set">
                                        <SetCom />
                                    </Route>
                                    <Route path="/Teacher/Download">
                                        <Download />  
                                    </Route>
                                </Switch>
                            </div> 
                    </div>
                </Router>
                        <Modal 
                            visible={this.state.isModalVisible}
                            width={800}
                            centered
                            footer={[
                                <Button
                                type="primary" 
                                ghost size="middle"
                                onClick = {this.handleClick}
                                >{this.state.btntext}</Button>
                            ]}
                            closable={false}
                            okType={null}
                            mask={this.state.isMask}
                            maskClosable={false}>
                            <StuClass 
                                handleDisTeach = {()=>{this.handleDisTeach()}}
                                handleExit = {()=>{this.handleExit()}}
                            />
                        </Modal>
                
            </div>
        )
    }

    componentDidMount(){
        let userId = localStorage.getItem("userId");
        let userName = localStorage.getItem('userName')
        this.setState({
            userid: userId,
            username:userName
        },()=>{
            // this.isLogin()
        })
        
        if(localStorage.hasOwnProperty("teachclass")){
            this.handleDisTeach();
        }else{
            this.setState({
                isModalVisible:true,
                isMask:true
            })
        }
        if(localStorage.hasOwnProperty("userId") && localStorage.getItem("type")==="admin") {
            this.props.history.push('/Manager');
        }
        else if(!localStorage.hasOwnProperty("userId")){
            message.info("请先登录",1);
            this.props.history.push('/Student/AllCompanies/ChosenClasses');
        }
    }
    
    handleDisTeach = () => {
        this.setState({
            isModalVisible:false,
            isMask:false
        },() => {
            console.log(this.state.isMask);
        })
    }
    //退出登录
    handleExit = () => {
        LoginApi.Exit(this.state.userid).then(
            (res) => {
                console.log(res);
                if(res.data.flag){
                    message.success("退出成功",1);
                    localStorage.clear();
                    this.props.history.push('/Student/AllCompanies/ChosenClasses');
                }else{
                    message.info("退出失败，请重新登录",1)
                }
            },
            (err) => {
                console.log(err);
            }
        )
    }
    // isLogin = () => {
    //     setInterval(() => {
    //         LoginApi.KeepLogin(this.state.userid).then(
    //         (res) => {
    //             console.log(1);
    //             console.log(res);
    //             if(!res.data.flag){
    //                 this.props.history.push('/Student/AllCompanies/ChosenClasses');
    //             }
    //         },
    //         (err) => {
    //             console.log(err);
    //         }
    //     )
    //     },300000);
        

    changeClass = () => {
        this.setState({
            isModalVisible:true,
            isMask:true,
            btntext:"取消选择"
        })
    }
    handleClick = () => {
      if(this.state.btntext === "退出登录"){
        this.handleExit();
      }else if(this.state.btntext === "取消选择"){
        this.handleDisTeach();
      }
    }
}

export default Teacher