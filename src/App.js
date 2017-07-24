import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import ScoreQuiz from './components/ScoreQuiz/ScoreQuiz';


const styles = {
  title: {
    cursor: 'pointer',
  },
};


class App extends Component {
  constructor(props){
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }
  handleTouchTap(){
    console.log("Touch tap");
  }
  render(){
    return(
        <MuiThemeProvider>
          <div>
          <AppBar
            title={<span style={styles.title}>Squiz.io</span>}
            onTitleTouchTap={this.handleTouchTap} 
          />
          <ScoreQuiz />
          </div>
        </MuiThemeProvider>
        );
  }
}

export default App;
