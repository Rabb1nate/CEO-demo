import React from 'react';
<<<<<<< HEAD
import App from './pages/App';
import Student from './pages/student/Student'
import Teacher from './pages/teacher/view/Teacher'
import Manager from './pages/manager/Manager'
import CEO from './pages/ceo/CEO'
import {Provider} from 'react-redux'
import store from './redux/store'
import {HashRouter as Router, Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';

class RouteMap extends React.Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Route path="/" component={App}>
              <Switch>
                <Route path="/Student" component={Student}/>
                <Route path="/Teacher" component={Teacher}/>
                <Route path="/Manager" component={Manager}/>
                <Route path="/CEO" component={CEO}></Route>
                <Redirect to="/Student"/>
              </Switch>
            </Route>
            {/* <Route path="/AllCompanies" component={AllCompanies}/>
      <Route path="/Join" component={Join}/>
      <Route path="/MyCompany" component={MyCompany}/> */}
            {/* <Route path="/MyCompany/WriteWant" component={WriteWant}></Route>
        <Route path="/MyCompany/Detail" component={Detail}></Route>
        <Route path="/MyCompany/Participants" component={Participants}></Route> */}
            {/* <Redirect from="/index" to="/Teacher/news"/> */}
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

=======
import Student from './pages/student/Student';

import {HashRouter as Router, Switch, Route, Redirect,BrowserRouter} from 'react-router-dom';

class RouteMap extends React.Component {

    render() {
        return (
            <div>
        <BrowserRouter >

     <Route path="/" component={Student}/>
      {/* <Route path="/AllCompanies" component={AllCompanies}/>
      <Route path="/Join" component={Join}/>
      <Route path="/MyCompany" component={MyCompany}/> */}
        {/* <Route path="/MyCompany/WriteWant" component={WriteWant}></Route>
        <Route path="/MyCompany/Detail" component={Detail}></Route>
        <Route path="/MyCompany/Participants" component={Participants}></Route> */}
        <Redirect to="/AllCompanies" from='/' />

  </BrowserRouter> 
  </div>
        )
    }
}
 
>>>>>>> 8a0aadb (CEO)

export default RouteMap

