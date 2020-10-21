import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAVRTE335Q9hO1DJFLmqqaqN3D8zMuMmw0",
  authDomain: "medexpert-d7560.firebaseapp.com",
  databaseURL: "https://medexpert-d7560.firebaseio.com",
  projectId: "medexpert-d7560",
  storageBucket: "medexpert-d7560.appspot.com",
  messagingSenderId: "1002345491705"
};

firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
export default firebase;
