import React, { FunctionComponent, useState, useEffect } from "react";
import { Context, IContext } from "./Utils/context";
import Login from "./Core/Pages/Login/Login";
import { IUser } from "./Core/Interfaces/IUser";
import Dashboard from "./Core/Pages/Dashboard/Dashboard";
import firebase from "firebase";
import * as FirebaseHelper from "./Utils/FirebaseHelper";
import "antd/dist/antd.css";
const App: FunctionComponent = (props) => {
  // Auth est l'objet de firebase pour l'utilisateur connecté.
  // if uid est vide, alors personne n'est connecté
  const [auth, setAuth] = useState({
    uid: "",
  });
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [sizeScreen, setSizeScreen] = useState<number>(window.innerWidth);
  const getContext: IContext = {
    User: {
      get: user,
      set: setUser,
    },
    Auth: {
      get: auth,
      set: setAuth,
    },
    SizeScreenUser: {
      get: sizeScreen,
      set: setSizeScreen,
    }
  };
  useEffect(() => {
    // on cherche si quelqu'un est connecté
    firebase.auth().onAuthStateChanged((a) => {
      if (a) {
        setAuth(a);
        FirebaseHelper.GetClient(a.uid).subscribe((_client) =>
          setUser(_client as IUser)
        );
      } else
        setAuth({
          uid: "",
        });
    });
    return () => {};
  },[]);

  return (
    <Context.Provider value={getContext}>
      {auth.uid === "" ? <Login /> : <Dashboard />}
    </Context.Provider>
  );
};

export default App;
