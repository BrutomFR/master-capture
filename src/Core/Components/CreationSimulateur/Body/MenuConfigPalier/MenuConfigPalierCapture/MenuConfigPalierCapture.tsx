import { Input } from "antd";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import "./.css";
import { IMenuConfigPalierCapture } from "./props";
const { TextArea } = Input;
const MenuConfigPalierCapture: FunctionComponent<IMenuConfigPalierCapture> = (
  props
) => {
  const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const changeTitreCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etape_capture.titre = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changeTextAccroche = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etape_capture.texte_accroche = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };

  const changeTextPrenom = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etape_capture.prenom = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changeTextEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etape_capture.email_capture = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changeTextButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etape_capture.button_valide = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  return (
    <div style={{ marginBottom: "200px" }}>
      <div className="main-title-config-palier-container">
        Configuration de la page de capture.
      </div>
      <div className="title-config-palier-container">Titre:</div>
      <Input
        defaultValue={props.simulateurSelected.etape_capture.titre}
        onChange={changeTitreCapture}
      />
      <div className="title-config-palier-container">Texte d'accroche:</div>
      <TextArea
        rows={6}
        defaultValue={props.simulateurSelected.etape_capture.texte_accroche}
        onChange={(e) => changeTextAccroche(e)}
      />
      <div className="title-config-palier-container">Prenom:</div>
      <Input
        defaultValue={props.simulateurSelected.etape_capture.prenom}
        onChange={changeTextPrenom}
      />
      <div className="title-config-palier-container">Email:</div>
      <Input
        defaultValue={props.simulateurSelected.etape_capture.email_capture}
        onChange={changeTextEmail}
      />
      <div className="title-config-palier-container">Bouton de validation:</div>
      <Input
        defaultValue={props.simulateurSelected.etape_capture.button_valide}
        onChange={changeTextButton}
      />
    </div>
  );
};

export default MenuConfigPalierCapture;
