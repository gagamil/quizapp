import React, { Component } from 'react';
import QuizElementChoicePick from './__QuizElementChoicePick/ScoreQuiz__QuizElementChoicePick';
import { Quiz } from '../CreateQuiz/QuizModels'; 


/**
 * state userChoices - {element:key, elementChoice:key, score:val}
 */
class PlayQuizGame extends Component {
  constructor(props) {
    super(props);
    this.state = {quiz:this.props.quiz, currQuestionCount: 1, userChoices:[]};
  }

  choiceSubmit(choiceKey, elementId, score){
    const updatedUserChoices = [...this.state.userChoices, {elementId:elementId, choice:choiceKey, score:score}];
    const nextQuestionCount = this.state.currQuestionCount+1;
    this.setState({userChoices: updatedUserChoices, currQuestionCount:nextQuestionCount});
     
    if(nextQuestionCount > this.state.quiz.elements.length){
      this.props.onComplete(updatedUserChoices);
    }
  }

  render() {
    const q = this.state.quiz.elements[this.state.currQuestionCount-1];
    return (
        <QuizElementChoicePick quizElementData={q} submitChoiceValue={this.choiceSubmit.bind(this)}/>
    );
  }
}

export default PlayQuizGame;
