import React, { Component, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";

import Search from "./components/users/Search";
import Users from "./components/users/Users";

import About from "./components/pages/About";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  clearUsers = () => {
    this.setState({
      users: []
    });
  };

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, alert } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
