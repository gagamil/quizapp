import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import {Card, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import CreateQuiz__SetQuizName from './__SetQuizName/CreateQuiz__SetQuizName'; 
import CreateQuiz__AddQuizElement from './__AddQuizElement/CreateQuiz__AddQuizElement';
import { Quiz, QuizElement } from './QuizModels'; 


class CreateQuiz extends Component {
  constructor(props){
    super(props);
    this.state = { id:this.props.match.params.id, quiz:null, error:null };
  }

  componentDidMount(){
    console.log("CreateQuiz::componentDidMount this.state.id === " + this.state.id);
    if(this.state.id === '' || this.state.id === undefined){//empty - initialization with default content
      const quiz = Quiz.createDefaultQuiz();
      this.setState({ id:quiz.id, quiz:quiz });
    }else{
      Quiz.fetchQuizWithId(this.state.id).then((quiz)=>{
        this.setState({ id:quiz.id, quiz:quiz });
      });
      
      
    }
  }

  appendElement(){
    let quizElements = this.state.quiz.elements;
    let quiz = this.state.quiz;
    quizElements.push(QuizElement.createDefaultQuizElement(this.state.id));
    quiz.elements = quizElements;
    this.setState({quiz:quiz});    
  }

  render(){
    
    if(this.state.quiz === null){
      return(<h1>wait...</h1>);
    }
    const seeTestBtn = <Paper  zDepth={1}>
      <FlatButton label="Pass Test" containerElement={<Link to={`/test/${this.state.id}`} />} />
      <FlatButton label="See Results" containerElement={<Link to={`/quiz/${this.state.id}/results`} />} />
    </Paper>;
    console.log("state in render::: "+this.state.quiz.id);
    const elements = this.state.quiz.elements.map((el)=>{
      return(
        <CreateQuiz__AddQuizElement key={el.id} quizId={this.state.quiz.id} quizElement={el} />
        )
    });
    
    return(
      <div>
        { seeTestBtn }
        <Card>
          <CreateQuiz__SetQuizName quizId={this.state.quiz.id} quizTitle={this.state.quiz.title} quizSubTitle={this.state.quiz.subTitle} />
          <CardActions>
            <FlatButton label="Add quiz" primary={true} onClick={this.appendElement.bind(this)} />
          </CardActions>
        </Card>
        { elements }
      </div>
    );
  }
}

export default CreateQuiz;