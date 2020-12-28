import React, { Component, Fragment } from 'react'
import { Table, Button, Menu} from 'antd'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import AddClass from '../components/AddClass'
import  DeleteClass  from '../components/DeleteClass'
import  ChoseTeacher  from '../components/ChoseTeacher'
import MenuClass from '../components/MenuClass'
import '../style/choseclass.scss'


class ChoseClass extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() { 
        return (
            <Fragment>
                        <Switch>
                            <Route path="/Manager/ChoseClass/MenuClass/addClass" component={MenuClass}/>
                            <Route path="/Manager/ChoseClass/MenuClass/deleteClass" component={MenuClass}/>
                            <Route path="/Manager/ChoseClass/MenuClass" component={MenuClass}/>
                            <Route path="/Manager/ChoseClass/ChoseTeacher" component={ChoseTeacher}/>
                            <Redirect from="/Manager/ChoseClass" to="/Manager/ChoseClass/ChoseTeacher" />
                        </Switch>
                 
            </Fragment>
        )
    }
                                                                                                                                                                                                                                                             
}
export default ChoseClass
   
 