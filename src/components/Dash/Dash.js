import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import {database} from '../../firebase';


class Dash extends Component {
  constructor(props){
    super(props);
    this.state = {quizList:[]}
  }
   componentDidMount() {
    database().ref('quiz').on('value', (snapshot)=>{
      console.log(snapshot.val());
      this.setState({quizList: snapshot.val()});
    });
  }

  render(){
    let items = [];
    const currDataList = this.state.quizList;
    for(let k in this.state.quizList){
      console.log("Dash::render key: " + k);
      const timestamp = new Date( currDataList[k].main.lastModified )
      items.push(
        <ListItem
          primaryText={ currDataList[k].main.title }
          secondaryText={ "Changed "+ timestamp.getDate()+'.'+timestamp.getMonth()+'.'+timestamp.getFullYear()+ ' '+timestamp.getHours()+':'+timestamp.getMinutes() }
          containerElement={<Link to={`/quiz/${k}/edit`} />}
        />
      );
    }
    
    return(
      <List>
        <Subheader>Latest quiz list</Subheader>
        { items }
      </List>
    )
  }
}

export default Dash;