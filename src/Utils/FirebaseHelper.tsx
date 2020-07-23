import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Observable } from "rxjs";
import { IUser } from "../Core/Interfaces/IUser";
// INITIALIZE
export default firebase.initializeApp({
  apiKey: "AIzaSyBcz77gFm01_RYScYnvUCKeQjHNii037nc",
  authDomain: "project-simulation-a7c4e.firebaseapp.com",
  databaseURL: "https://project-simulation-a7c4e.firebaseio.com",
  projectId: "project-simulation-a7c4e",
  storageBucket: "project-simulation-a7c4e.appspot.com",
  // tslint:disable-next-line:object-literal-sort-keys
  messagingSenderId: "825066149119",
  appId: "1:825066149119:web:7efa33502ba8eade24a8ca",
  measurementId: "G-K6MP6XH8B7",
});
// firebase.initializeApp(config);

export const db = firebase.firestore();

export function LogOut() {
  return firebase.auth().signOut();
}
export function SignIn(
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
export function UpdateClient(uid: string, client: IUser) {
  return db.collection("users").doc(uid).update(client);
}
export function GetClient(uid: string) {
  return new Observable((sub) => {
    db.collection("users")
      .doc(uid)
      .onSnapshot((o) => sub.next(o.data()));
  });
}
