import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


class __EmailForm extends Component {
  constructor(props){
    super(props);
    this.state = {emailValue:''};
  }

  sendEmailClicked(){
    this.props.emailSubmitted(this.state.emailValue);
  }

  render(){
    return(
      <div>
        <p>To see your score please enter your email</p>
        <TextField
          hintText="Email"
          value={this.state.emailValue}
        />
        <FlatButton label="Ok" primary={true} onClick={this.sendEmailClicked.bind(this)} />
      </div>
    );
  }
}

export default __EmailForm;