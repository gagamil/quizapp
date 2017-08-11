import React, { Component } from 'react';
import { Quiz } from '../CreateQuiz/QuizModels'; 

import PlayQuizGame from './PlayQuizGame';
import __ScoreQuizResults, { getTotalScore } from './__ScoreQuizResults/ScoreQuiz__ScoreQuizResults';
import __EmailForm from './__EmailForm/ScoreQuiz__EmailForm';


class QuizGame extends Component {
  constructor(props) {
    super(props);
    this.state = {quiz:null, userChoices:[], email:'', gameOver:false};
    this.sendUserResultsToServer = this.sendUserResultsToServer.bind(this);
  }

  componentDidMount(){
    Quiz.fetchQuizWithId(this.props.match.params.id).then((quiz)=>{
      this.setState({ quiz:quiz });
    });
  }

  onGameComplete(userChoices){
    this.setState({gameOver:true});
    if(this.state.quiz.emailRequired === false || this.state.quiz.emailRequired === undefined){
      this.sendUserResultsToServer(userChoices).then(()=>{
        this.setState({userChoices:userChoices});
      });
    }
  }

  emailSubmitted(email){
    console.log(email);
    this.sendUserResultsToServer().then(()=>{
      /// send email to the email addr with the overall result.
      this.setState({email:email});
    });
  }

  render() {
    if(this.state.quiz===null || (this.state.gameOver===true && this.state.userChoices.length === 0) ){
      return(<h1>loading...</h1>);
    }

    if(this.state.userChoices.length === 0){
      return(<PlayQuizGame quiz={this.state.quiz} onComplete={this.onGameComplete.bind(this)} />);
    }else{
      if(this.state.quiz.emailRequired){
        if(this.state.email.length === 0){
          return(<__EmailForm emailSubmitted={this.emailSubmitted.bind(this)} />);
        }else{
          return(<h1>Your test result is beign sent to the email you have just provided. Thanks</h1>);
        }
      }else{
          return(<__ScoreQuizResults userChoices={this.state.userChoices} quizId={this.state.quiz.id}/>);
      }
    }
  }

  sendUserResultsToServer(userChoices=[]){
    const userChoiceList = userChoices.length > 0 ? userChoices : this.state.userChoices;
    const data = {
      quizId:this.state.quiz.id,
      quizName:this.state.quiz.title,
      userChoices:userChoiceList,
      email:this.state.email,
      totalScore:getTotalScore(userChoiceList)
    }
    return fetch('https://us-central1-squizio-88a31.cloudfunctions.net/addQuizResults',
    {
      headers: {'Content-Type': 'application/json'},
      //mode:'no-cors',
      method:'POST',
      body:JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
    }).then(function(r) {
      console.log(r);
      //this.setState({loading:false});
    });
  }
}

export default QuizGame;