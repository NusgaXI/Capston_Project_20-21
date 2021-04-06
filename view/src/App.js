
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import UsersPage from './pages/Users';
import TimeslotsPage from './pages/Timeslots';
import BookingsPage from './pages/Bookings';
import AuthContext from './context/auth-context'


import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    role: null,
    fullName: null,
  };

  login = (token, userId, role, fullName, tokenExpiration) => {
    this.setState({ token: token, userId: userId, role: role, fullName: fullName });
  };

  logout = () => {
    this.setState({ token: null, userId: null, role: null, fullName: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token, 
              userId: this.state.userId, 
              role: this.state.role,
              fullName: this.state.fullName,
              login: this.login, 
              logout: this.logout
            }}>
            <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/timeslots" exact />}
                {this.state.token && <Redirect from="/auth" to="/timeslots" exact />}
                {!this.state.token && <Route path="/auth" component={AuthPage} />}
                {this.state.token && <Route path="/users" component={UsersPage} />}
                {this.state.token && <Route path="/timeslots" component={TimeslotsPage} />}
                {this.state.token && <Route path="/bookings" component={BookingsPage} />}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
