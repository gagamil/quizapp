import * as firebase from "firebase";


var config = {
    apiKey: <ENTER_YOUR_DATA_HERE>,
    authDomain: <ENTER_YOUR_DATA_HERE>,
    databaseURL: <ENTER_YOUR_DATA_HERE>,
    projectId: <ENTER_YOUR_DATA_HERE>,
    storageBucket: <ENTER_YOUR_DATA_HERE>,
    //messagingSenderId: <ENTER_YOUR_DATA_HERE>
  };


  firebase.initializeApp(config);



export const database = firebase.database
export const auth = firebase.auth
export const provider = new firebase.auth.GoogleAuthProvider();