import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";

import Dashboard from './Dashboard'
import Navigation from './Navigation'
import PostPage from './PostPage'
import { handlerInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handlerInitialData());
  }
  
  render() {
    const {loading} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Navigation />
            {!loading && (
              <Fragment>
                <Route path="/" exact component={Dashboard} />
                <Route path="/posts" exact component={Dashboard} />
                <Route path="/posts/:id" component={PostPage} />
              </Fragment>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ loadingBar}) {

  return {
    loading: loadingBar ?  loadingBar.default === 1 : true,
    
  };
}

export default connect(mapStateToProps)(App);

