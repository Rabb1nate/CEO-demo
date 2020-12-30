import React, { Component, Fragment } from 'react';
import { Button, Menu, message, Spin} from 'antd'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import AddClass from './AddClass'
import  DeleteClass  from './/DeleteClass'
import ChoseClass from './ChoseTeacher'
import ManagerApi from '../../../until/api/managerApi';

class MenuClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            teacherId:"",
            teacherName:"",
            btucontent:"添加班级",
            list:[],
            key:"",
            thisVisible:true,
            loading:false
        }
        this.changeBtnContent = this.changeBtnContent.bind(this);
        this.getTeachClassList = this.getTeachClassList.bind(this);
        this.addClass = this.addClass.bind(this)
        this.deleteClass = this.deleteClass.bind(this);
        this.handlebtnChange = this.handlebtnChange.bind(this);
        this.toChoseClass = this.toChoseClass.bind(this);
    }
    render(){
        return(
            <Fragment>
                <Router >
                        <div>
                        <div>
                            <span className="chose-top">选择班级</span>
                            <span className="chose-name">{this.state.teacherName}</span>
                            <Button type="primary" onClick={this.toChoseClass} style={{marginRight:"10px",marginLeft:"10px"}}>更改班级</Button>
                            <Button type="primary" onClick={this.handlebtnChange} loading={this.state.loading}>{this.state.btucontent}</Button>
                        </div>
                        <Menu theme="light"  mode="horizontal"  defaultSelectedKeys={[sessionStorage.getItem("count")||"1"]}>
                            <Menu.Item key = "1" onClick={(item) => {this.changeBtnContent(item)}}>
                                <Link to="/Manager/ChoseClass/MenuClass/addClass">选择班级</Link>
                            </Menu.Item>
                            <Menu.Item key = "2" onClick={(item) => {this.changeBtnContent(item)}}>
                                <Link to="/Manager/ChoseClass/MenuClass/deleteClass">删除班级</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <Switch>
                            <Route path="/Manager/ChoseClass/MenuClass/addClass">
                                {this.state.thisVisible?
                                    <AddClass getTeachClassList = {this.getTeachClassList}/>:
                                    <Spin size="large" style={{marginTop:"100px",marginLeft:"400px"}}></Spin>
                                }
                            </Route>
                            <Route path="/Manager/ChoseClass/MenuClass/deleteClass">
                                 {this.state.thisVisible?
                                    <DeleteClass getTeachClassList = {this.getTeachClassList}/>:
                                    <Spin size="large" style={{marginTop:"100px",marginLeft:"400px"}}></Spin>
                                 }
                            </Route>
                            <Redirect from="/Manager/ChoseClass/MenuClass" to="/Manager/ChoseClass/MenuClass/addClass"></Redirect>
                        </Switch>
                    </div>                    
                    </Router>
            </Fragment>
        )
    }
    componentDidMount(){
        let teacherid = localStorage.getItem("teachclass");
        let teachername = localStorage.getItem("teachName");
        this.setState({
            teacherId:teacherid,
            teacherName:teachername,
            key:localStorage.getItem("count")
        },() => {
        if(this.state.key == 2){
            this.setState({
                btucontent:"删除班级"
            })
        }else{
            this.setState({
                btucontent:"添加班级"
            })
        }
        })
        
    }
    //改变按钮
    changeBtnContent = (item) => {

        if(item.key == 1){
            this.setState({
                btucontent:"添加班级"
            })
            sessionStorage.setItem("count",item.key)
        }
        else if(item.key == 2){
            this.setState({
                btucontent:"删除班级"
            })
            sessionStorage.setItem("count",item.key)
        }
    }


    getTeachClassList = (list,ref) => {
        this.setState({
            List:list
        },() => {
            console.log(this.state.List);
        })
        this.child = ref;
    }

    addClass = (list) => {
        this.setState({
            thisVisible:false,
            loading:true
        })
        ManagerApi.addClass(list).then(
            (res) => {
                if(!res.data.flag && res.data.message === "没有登录，请先登录"){
                    localStorage.clear();
                    this.props.history.push('/Student/AllCompanies/ChosenClasses');
                  }
                if(res.data.flag){
                    message.success("添加成功",1);
                    this.setState({
                        thisVisible:true,
                        loading:false
                    })
                }
            },
            (err) => {
                message.error("添加失败",1)
            })
    }
    deleteClass = (list) => {
        this.setState({
            thisVisible:false,
            loading:true
        })
        ManagerApi.deleteClass(list).then(
            (res) => {
                if(!res.data.flag && res.data.message === "没有登录，请先登录"){
                    localStorage.clear();
                    this.props.history.push('/Student/AllCompanies/ChosenClasses');
                  }
                if(res.data.flag){
                    message.success("删除成功",1);
                    this.setState({
                        thisVisible:true,
                        loading:false
                    })
                }
            },
            (err) => {
                message.error("删除失败",1)
            })
    }
    handlebtnChange = () => {
        if(this.state.btucontent == "添加班级"){
            this.addClass(this.state.List);
        }
        else if(this.state.btucontent == "删除班级")
        {
            this.deleteClass(this.state.List)
        }
    }

    toChoseClass = () => {
        this.props.history.push('/Manager/ChoseClass/ChoseTeacher')
    }
}

export default MenuClass;