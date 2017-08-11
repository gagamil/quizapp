import {database} from '../../firebase';


/**
 * QUIZ Element
 */
export function createQuizElementOption(quizId, elementId, data){
   return database().ref().child(`quiz/${quizId}/elements/${elementId}/choices`).push(data).key;
}

export function updateQuizElementOption(quizId, elementId, id, data){
  return database().ref().child(`quiz/${quizId}/elements/${elementId}/choices/${id}`).set(data);
}

export function createQuizElement(quizId, data){
  console.log('QuizID: '+quizId + ' data ' +data);
  return database().ref().child(`quiz/${quizId}/elements`).push(data).key;
}

export function updateQuizElementTitle(quizId, id, data){
  return database().ref().child(`quiz/${quizId}/elements/${id}/title`).set(data);
}



/**
 * QUIZ
 */
export function createQuiz(data){
  let newData = data;
  newData['lastModified'] = database.ServerValue.TIMESTAMP;
  const quizId =  database().ref().child('quiz').push().key;
  database().ref().child(`quiz/${quizId}/main`).set(newData);
  return quizId
}

export function updateQuizMainData(quizId ,data){
  let newData = data;
  newData['lastModified'] = database.ServerValue.TIMESTAMP;
  let updates = {};
  updates[`/${quizId}/main`] = newData;
  database().ref().child(`quiz`).update(updates).then(function(){
    console.log("saveTitle::DB OK");
    return 0;
  }).catch(function(error){
    console.log("saveTitle::DB ERR"+error);
    return error;
  });
}

export function fetchQuizById(quizId){
  console.log("fetchQuizById: " +quizId);
  return database().ref(`quiz/${quizId}`).once('value').then(function(snapshot) {
    const quiz = snapshot.val();
    console.log(quiz);
    return quiz;
  }).catch(function(err){
    console.log(err);
  });
}

/**
 * QUIZ RESULT
 */

export function fetchQuizResults(quizId){
  console.log("Server::fetchQuizResults quizId: " + quizId);
  return database().ref(`results/${quizId}`).once('value');
}