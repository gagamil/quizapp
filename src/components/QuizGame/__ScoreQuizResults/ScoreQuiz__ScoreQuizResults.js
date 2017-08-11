import React, { Component } from 'react';


export function getTotalScore(userChoices){
  const score = userChoices.map((choice)=>{
    return choice.score;
  });
  const totalScore = score.reduce(function(a, b) {
    return a + b;
  });
  return totalScore;
}

class __ScoreQuizResults extends Component {

  render(){
        const totalScore = getTotalScore(this.props.userChoices);
        return (
            <h1 className="title has-text-centered">U're score is { totalScore }</h1>
        );
  }
}

export default __ScoreQuizResults;