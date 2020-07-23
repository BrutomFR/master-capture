import "antd/dist/antd.css";
import firebase from "firebase";
import  { FunctionComponent, useEffect, useState } from "react";
import React from "react";
import { IUser } from "./Core/Interfaces/IUser";
import Dashboard from "./Core/Pages/Dashboard/Dashboard";
import Login from "./Core/Pages/Login/Login";
import { Context, IContext } from "./Utils/context";
import * as FirebaseHelper from "./Utils/FirebaseHelper";
const App: FunctionComponent = (props) => {
  // Auth est l'objet de firebase pour l'utilisateur connecté.
  // if uid est vide, alors personne n'est connecté
  const [auth, setAuth] = useState({
    uid: "",
  });
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [sizeScreen, setSizeScreen] = useState<number>(window.innerWidth);
  const getContext: IContext = {
    Auth: {
      get: auth,
      set: setAuth,
    },
    SizeScreenUser: {
      get: sizeScreen,
      set: setSizeScreen,
    },
    User: {
      get: user,
      set: setUser,
    },
  };
  useEffect(() => {
    // on cherche si quelqu'un est connecté
    firebase.auth().onAuthStateChanged((a) => {
      if (a) {
        setAuth(a);
        FirebaseHelper.GetClient(a.uid).subscribe((client) => {
          console.log(client);
          setUser(client as IUser);
        });
      } else {
        setAuth({
          uid: "",
        });
      }
    });
    return () => {
      //
    };
  }, []);

  return (
    <Context.Provider value={getContext}>
      {auth.uid === "" ? <Login /> : <Dashboard />}
    </Context.Provider>
  );
};

export default App;
