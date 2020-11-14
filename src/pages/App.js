import React, { Component } from 'react';
import Student from './student/Student'
import {Provider} from 'react-redux'
import store from '../redux/store'
import CEO from './ceo/CEO'
import Teacher from './teacher/content/Teacher'
import {HashRouter as Router, Switch, Route, Redirect,BrowserRouter} from 'react-router-dom';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Route path="/Student" component={Student}/>
                <Route path="/Teacher" component={Teacher}/>
                <Route path="/CEO" component={CEO}/>
            </div>
         );
    }
}

export default App;