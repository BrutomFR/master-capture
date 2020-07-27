import { Input, Layout } from "antd";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import "./.css";
import { IMenuConfigPalier } from "./props";
const { Sider } = Layout;
const MenuConfigPalier: FunctionComponent<IMenuConfigPalier> = (props) => {
  const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const changeTitreCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    // props.simulateurSelected?.etape_capture.titre
    let simulateur = monContext.User.get.pages_simulations.find(
      (s) => s.Id === props.simulateurSelected?.Id
    );
    if (simulateur) {
      simulateur.etape_capture.titre = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  return (
    <Sider width="300px" className="menu-configuratoin-creation-simulateur">
      <div>
        <div>
          <h1 style={{ color: "white" }}>Configuration du simulateur</h1>
        </div>
        <p>Couleur du menu:</p>
        <Input
          defaultValue={props.backgroundColorHeader}
          onChange={(e) => props.setBackgroundColorHeader(e.target.value)}
        />
        {props.palierSelected === 0 && (
          <div>
            <h1>Configuration de la page de capture.</h1>
            <h3>Titre:</h3>
            <Input
              defaultValue={props.simulateurSelected?.etape_capture.titre}
              value={props.simulateurSelected?.etape_capture.titre}
              onChange={changeTitreCapture}
            />
          </div>
        )}
        <div>{props.etapeConfigSelected?.titre_progressbar}</div>
      </div>
    </Sider>
  );
};

export default MenuConfigPalier;
