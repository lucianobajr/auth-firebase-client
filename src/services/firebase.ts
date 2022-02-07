import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

import firebaseConfig from "../config";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
