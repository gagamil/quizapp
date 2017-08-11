import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {CardText} from 'material-ui/Card';
import '../../../index.css';
import { Quiz } from '../QuizModels'


let titleTimer = null;


class CreateQuiz__SetQuizName extends Component {
  constructor(props){
    super(props);
    this.state = {id:this.props.quizId, titleValue:this.props.quizTitle, subtitleValue:this.props.quizSubTitle}
  }

  titleAutosave(){
    console.log("CreateQuiz__SetQuizName::titleAutosave "+this.state.id);
    Quiz.updateQuizTitleAndSubtitleWithData(this.state.id, this.state.titleValue, this.state.subtitleValue);
  }

  titleChanged(e){
    if(titleTimer !== null){
      clearTimeout(titleTimer);
    }
    this.setState({titleValue: e.target.value});
    titleTimer = setTimeout(this.titleAutosave.bind(this), 3000);
  }

  subtitleChanged(e){
    if(titleTimer !== null){
      clearTimeout(titleTimer);
    }
    this.setState({subtitleValue: e.target.value});
    titleTimer = setTimeout(this.titleAutosave.bind(this), 3000);
  }

  handleFocus(event) {
    event.target.select();
  }

  render(){
    return(
        <CardText>
          <TextField
            hintText="Untitled"
            value={this.state.titleValue}
            onChange={this.titleChanged.bind(this)}
            className="large-input-field"
            onFocus={this.handleFocus.bind(this)}
          />
          <br/>
          <TextField
            hintText="Quiz description"
            value={this.state.subtitleValue}
            onChange={this.subtitleChanged.bind(this)}
            onFocus={this.handleFocus.bind(this)}
          />
        </CardText>
    )
  }
}

export default CreateQuiz__SetQuizName;