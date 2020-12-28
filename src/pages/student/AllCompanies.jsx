import React, { Component } from 'react';
import { withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../redux/actionCreators/creators'
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import ChosenClasses from './ChosenClasses'

class AllCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>


            <Route path="/Student/AllCompanies/ChosenClasses" component={ChosenClasses}></Route>
            <Redirect to="/Student/AllCompanies/ChosenClasses"/>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompanies: (userId, page, rows) => {
      dispatch(actions.getAllCompanies(userId, page, rows))
    },
  }
}
const mapStateToProps = state => {

  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllCompanies))
