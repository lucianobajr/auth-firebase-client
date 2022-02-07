import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import config from "../config";

firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
