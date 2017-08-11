const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });


exports.addQuizResults = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
  // Grab the text parameter.
  const jsonBody = req.body;
  console.log(jsonBody.quizId);
  
  admin.database().ref(`/results/${jsonBody.quizId}`).push(
    {
      "choices":jsonBody.userChoices,
      "email":jsonBody.email,
      "quizName":jsonBody.quizName,//denormalization
      "totalScore":jsonBody.totalScore
    }
    ).then(snapshot => {
    console.log("OK Saving db");
    res.status(200).send("Ok");
  }).catch((err)=>{
    console.log("err saving to db " + err);
    res.status(400).send(err);
  });
  })
});