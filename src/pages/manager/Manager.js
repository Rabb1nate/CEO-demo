import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ChoseClass from './view/ChoseClass'
import ImData from './view/ImData'
import './style/Nav.css';
import {  Menu,Button,message } from 'antd';
import LoginApi from '../../until/api/LoginApi'
import { UserOutlined, VideoCameraOutlined, EditOutlined, OrderedListOutlined } from '@ant-design/icons';

class Manager extends Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            userid:''
          }
          this.handleExit = this.handleExit.bind(this);
    }
    render() {
        return (
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
                                <Link to="/Manager/ChoseClass">选择班级</Link>
                            </Menu.Item>
                            
                            <Menu.Item key="3" icon={<EditOutlined />}>
                                <Link to="/Manager/data">导入数据</Link> 
                            </Menu.Item>
                            

                        </Menu>
                        
                    </div>


                    <div className="content">
                        <Switch>
                            <Route path="/Manager/ChoseClass">
                                <ChoseClass/>
                            </Route>
                            
                            <Route path="/Manager/data">
                                <ImData/>
                            </Route>
                            
                        </Switch>
                    </div>
                    
                </div>
            </Router>

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
        if(localStorage.hasOwnProperty("userId") && localStorage.getItem("type")==="teacher") {
            this.props.history.push('/teacher');
        }
        else if(!localStorage.hasOwnProperty("userId")){
            message.info("请先登录",1);
            this.props.history.push('/Student/AllCompanies/ChosenClasses');
        }
    }
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
    //     },30000); 
    // }
}

export default Manager