import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import QuizGame from './components/QuizGame/QuizGame';
import Dash from './components/Dash/Dash';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import HomePage from './components/HomePage/HomePage';
import { login, logout, getUser, checkLoggedIn } from './auth';
import QuizResults from './components/QuizResults/QuizResults';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    getUser() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


const styles = {
  title: {
    cursor: 'pointer',
  },
};


const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Dash" containerElement={<Link to="/dash"/>} />
    <MenuItem primaryText="New" containerElement={<Link to="/newquiz"/>} />
    <Divider />
    <MenuItem onClick={logout} primaryText="Sign out" />
    
  </IconMenu>
);

Logged.muiName = 'IconMenu';


class App extends Component {
  constructor(props){
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {"loginCheckInProgress":true};
  }

  componentDidMount() {
    checkLoggedIn(this.getUserLoginCheckComplete.bind(this));
  }

  getUserLoginCheckComplete(){
    this.setState({"loginCheckInProgress":false});
  }

  handleTouchTap(){
    console.log("Touch tap");
  }
  render(){
    if(this.state.loginCheckInProgress===true){
      return(
        <MuiThemeProvider>
          <LinearProgress mode="indeterminate" />
        </MuiThemeProvider>
      );
    }else{
      const loginCtrl = getUser() ? <Logged /> : <FlatButton onClick={login} label="Login with Google" />;
      return(
        <MuiThemeProvider>
          <Router>
            <div>
              <AppBar
                title={<span style={styles.title}>Squiz.io</span>}
                onTitleTouchTap={this.handleTouchTap} 
                iconElementRight={loginCtrl}
              />          
              <Route exact path="/" component={HomePage}/>
              <Route path="/test/:id" component={QuizGame}/>
              <PrivateRoute path="/dash" component={Dash}/>
              <PrivateRoute path="/newquiz" component={CreateQuiz}/>
              <PrivateRoute path="/quiz/:id/edit" component={CreateQuiz}/>
              <PrivateRoute path="/quiz/:id/results" component={QuizResults}/>
            </div>
          </Router>
        </MuiThemeProvider>
        );
    }
  }
}

export default App;
