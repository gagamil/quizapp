import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { Quiz } from '../CreateQuiz/QuizModels';


class QuizResults extends Component{
  constructor(props){
    super(props);
    this.state = { dataSnapshot:null };
  }

  componentDidMount(){
    Quiz.fetchQuizResults(this.props.match.params.id).then((snapshot)=>{
      this.setState({dataSnapshot:snapshot});
    });
  }
  render(){
    if(this.state.dataSnapshot === null){
      return(<h1>loading...</h1>);
    }
    let dataListItems = [];
    this.state.dataSnapshot.forEach(function(snapshot){
      let value = snapshot.val();
      dataListItems.push(<ListItem key={snapshot.key} primaryText={value.quizName + ' ' + value.email} secondaryText={"Score: "+value.totalScore} />);
    });
    return(
      <List>
        <Subheader>Quiz results</Subheader>
        { dataListItems }
      </List>
    );
  }
}

export default QuizResults;