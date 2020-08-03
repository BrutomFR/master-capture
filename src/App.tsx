import "ant-design-pro/dist/ant-design-pro.css";
import "antd/dist/antd.css";
import firebase from "firebase";
import { FunctionComponent, useEffect, useState } from "react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./.css";
import { IUser } from "./Core/Interfaces/IUser";
import CreationSimulateur from "./Core/Pages/CreationSimulateur/CreationSimulateur";
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
        FirebaseHelper.GetClient(a.uid).subscribe((client) => {
          console.log(client);
          if (client) setUser(client as IUser);
          else {
            setUser({
              Nom: "",
              Prenom: "",
              tutoriel: {
                newUser: true,
                createSimulateur: true,
              },
              simulateurs: [],
              email: a.email,
            });
          }
          setAuth(a);
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
      {sizeScreen > 900 ? (
        auth.uid === "" ? (
          <Login />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route path="/simulateur/:id" component={CreationSimulateur} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </BrowserRouter>
        )
      ) : (
        <div>La version mobile n'est pas encore disponible.</div>
      )}
    </Context.Provider>
  );
};

export default App;
