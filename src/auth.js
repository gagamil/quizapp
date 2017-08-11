import { auth, provider } from './firebase';

let currentUser = null;
let initialLoginCheckCB = null;
export function checkLoggedIn(cb){
  initialLoginCheckCB = cb;
}
auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Have user :"+ user);
    currentUser = user;
  } else {
    console.log("NO user");
    currentUser = null;
  }
  initialLoginCheckCB();
});

export async function login() {
    const result = await auth().signInWithPopup(provider)
    currentUser = result.user;
  }
export async function logout() {
    await auth().signOut()
    currentUser = null;
  }

export function getUser(){
  console.log("curr user: " + currentUser);
  console.log("fbuser: " + auth().currentUser);
  return currentUser;
}