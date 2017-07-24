import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SelectableList from '../../SelectableList/SelectableList';


class Choices extends Component{
  constructor(props) {
    super(props);
    this.newItemChosen = this.newItemChosen.bind(this);
  }

  newItemChosen(idx){
    this.props.choiceSet(idx)
  }
  render(){
    const answerChoices = this.props.choicesList.map(  
                            (choice)=>
                            <ListItem
                              primaryText={choice.c}
                              key={choice.p}
                              value={ choice.p } 
                            />
                            );
    return(
          <SelectableList defaultValue={-1} onChoiceSet={this.newItemChosen} selectedIndex={this.props.selectedValue}>
            <Subheader>Selectable Contacts</Subheader>
            { answerChoices }
          </SelectableList>
      );
  }
}


class QuizElement extends Component{
  constructor(props) {
    super(props);
    this.state = {value: -1};
    this.choiceSet = this.choiceSet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  choiceSet(choiceValue){
    console.log("QuizElement::choiceSet: " + choiceValue);
    this.setState({value:choiceValue});
  }

  handleSubmit(){
    this.props.submitChoiceValue(this.state.value);
    this.setState({value: -1});//reset
  }

  render(){
    const OkBtn = this.state.value === -1 ? null :  <FlatButton label="Submit" onClick={this.handleSubmit} />
    const answerChoices = this.props.quizElementData.choices.map(  
                            (choice)=>
                            <ListItem
                              primaryText={choice.c}
                              key={choice.p}
                              value={ choice.p } 
                            />
                            );
    return(
      <Card>
        <CardHeader
          title="Опрелеите вероятность разбогатеть"
        />
        <CardText>
          
          <SelectableList defaultValue={-1} onChoiceSet={this.choiceSet} selectedIndex={this.state.value}>
            <Subheader>{ this.props.quizElementData.quiz }</Subheader>
            { answerChoices }
          </SelectableList>
        </CardText>
        <CardActions>
          { OkBtn }
        </CardActions>
      </Card>
    );
  }
};

export default QuizElement;