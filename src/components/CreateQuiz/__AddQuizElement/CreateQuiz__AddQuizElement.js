import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { QuizElement, QuizElementOption } from '../QuizModels'; 

class __AddQuizElementTitle extends Component{
  constructor(props){
    super(props);
    this.state = {value:this.props.title};
    this.titleTimer = null;
  }

  titleAutosave(){
    QuizElement.updateQuizElementTitle(this.props.quizId, this.props.id, this.state.value);
  }

  titleChanged(e){
    if(this.titleTimer !== null){
      clearTimeout(this.titleTimer);
    }
    this.setState({value: e.target.value});
    this.titleTimer = setTimeout(this.titleAutosave.bind(this), 3000);
  }

  handleFocus(event) {
    event.target.select();
  }

  render(){
    return(
      <div>
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            value={this.state.value}
            onChange={this.titleChanged.bind(this)}
            onFocus={this.handleFocus.bind(this)}
          />
      </div>
    )
  }
}


class __AddQuizElementOption extends Component{
  constructor(props){
    super(props);
    this.state = {elementTitleValue:this.props.elementOption.title, scoreValue:this.props.elementOption.score};
    this.titleTimer = null;
  }

  objectAutosave(){
    QuizElementOption.updateElementOptionData(this.props.quizId, this.props.elementId, this.props.elementOption.id, this.state.elementTitleValue, this.state.scoreValue);
  }

  titleChanged(e){
    if(this.titleTimer !== null){
      clearTimeout(this.titleTimer);
    }
    this.setState({elementTitleValue: e.target.value});
    this.titleTimer = setTimeout(this.objectAutosave.bind(this), 3000);
  }

  scoreChanged(e){
    if(this.titleTimer !== null){
      clearTimeout(this.titleTimer);
    }
    this.setState({scoreValue: Number.parseInt(e.target.value, 10)});
    this.titleTimer = setTimeout(this.objectAutosave.bind(this), 3000);
  }

  handleFocus(event) {
    event.target.select();
  }

  render(){
    
    return(
          <div>
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            value={this.state.elementTitleValue}
            onChange={this.titleChanged.bind(this)}
            onFocus={this.handleFocus.bind(this)}
          />
          <TextField
            hintText="Score"
            floatingLabelText="Score"
            value={this.state.scoreValue}
            onChange={this.scoreChanged.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            type="number"
          />
          <br />
          
          </div>
          
    )
  }
}


class CreateQuiz__AddQuizElement extends Component {
  constructor(props){
    super(props);
    this.state = {elementOptions:this.props.quizElement.elementOptions};
  }
  
  appendElementOption(){
    let elementOptions = this.state.elementOptions;
    elementOptions.push(QuizElementOption.createDefaultElementOption(this.props.quizId, this.props.quizElement.id));
    this.setState({elementOptions:elementOptions});    
  }

  render(){
    const options = this.props.quizElement.elementOptions.map((el)=>{
      return <__AddQuizElementOption key={el.id} quizId={this.props.quizId} elementId={this.props.quizElement.id} elementOption={ el } />;
    });
    
    return(
      <Card>
        <CardText>
          <div>
            <__AddQuizElementTitle quizId={this.props.quizId} id={this.props.quizElement.id} title={this.props.quizElement.title} />
            { options }
          </div>
        </CardText>
        <CardActions>
          <FlatButton label="Add option" primary={true} onClick={this.appendElementOption.bind(this)} />
        </CardActions>
      </Card>
    )
  }
}

export default CreateQuiz__AddQuizElement;