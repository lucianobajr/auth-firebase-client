import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-auth-firebase-c1c6c.cloudfunctions.net/api",
});

export { api };
/*  */