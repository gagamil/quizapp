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


const DEFAULT_FIELD_VAL = -10000000;

class QuizElement extends Component{
  constructor(props) {
    super(props);
    this.state = {value: DEFAULT_FIELD_VAL};
    this.choiceSet = this.choiceSet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  choiceSet(choiceValue){
    console.log("QuizElement::choiceSet: " + choiceValue);
    this.setState({value:choiceValue});
  }

  handleSubmit(){
    //scan array for the right id and fetch score value
    let score = null;
    for (let i = 0; i < this.props.quizElementData.elementOptions.length; i++) {
      const c = this.props.quizElementData.elementOptions[i];
       if(c.id === this.state.value){
        score= c.score;
        break;
      }
      continue;
    }
    this.props.submitChoiceValue(this.state.value, this.props.quizElementData.id, score);
    this.setState({value: DEFAULT_FIELD_VAL});//reset
  }

  render(){
    const OkBtn = this.state.value === DEFAULT_FIELD_VAL ? null :  <FlatButton label="Submit" onClick={this.handleSubmit} />
    const answerChoices = this.props.quizElementData.elementOptions.map(  
                            (choice)=>
                            <ListItem
                              primaryText={choice.title}
                              key={choice.id}
                              value={ choice.id } 
                            />
                            );
    return(
      <Card>
        <CardHeader
          title={this.props.quizElementData.title}
        />
        <CardText>
          
          <SelectableList defaultValue={DEFAULT_FIELD_VAL} onChoiceSet={this.choiceSet} selectedIndex={-1}>
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