import React, { Component } from 'react';
import QuizElement from './__QuizElement/ScoreQuiz__QuizElement';
import {qList} from './ScoreQuizModels';


class ScoreQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {totalScore: 0, currQuestion: 1, totalQuestions: 3};
    this.scoreSubmit = this.scoreSubmit.bind(this);
  }

  scoreSubmit(score){
    const currScore = this.state.totalScore;
    const currQuestion = this.state.currQuestion;
    this.setState({totalScore: currScore+score, currQuestion:currQuestion+1});
  }

  render() {
    if(this.state.currQuestion <= this.state.totalQuestions){
      const q = qList[this.state.currQuestion-1];
      return (
          <QuizElement quizElementData={q} submitChoiceValue={this.scoreSubmit}/>
      );
    }else{
      return (
          <h1 className="title has-text-centered">U're score is { this.state.totalScore }</h1>
      );
    }
  }
}

export default ScoreQuiz;
