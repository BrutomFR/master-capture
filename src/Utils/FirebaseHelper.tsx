import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Observable } from "rxjs";
import { IUser } from "../Core/Interfaces/IUser";
// INITIALIZE
export default firebase
  .initializeApp({
    apiKey: "AIzaSyCZZtKGf_nW4bJ_Wor2VCX71ee-LVecAnE",
    authDomain: "master-capture.firebaseapp.com",
    databaseURL: "https://master-capture.firebaseio.com",
    projectId: "master-capture",
    storageBucket: "master-capture.appspot.com",
    messagingSenderId: "493034871634",
    appId: "1:493034871634:web:3546e8a2c0741b1779b88b",
    measurementId: "G-L78QVCSWW9",
  })
  .analytics();

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
