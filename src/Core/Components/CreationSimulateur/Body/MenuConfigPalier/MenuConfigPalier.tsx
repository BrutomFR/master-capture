import { Input, Layout } from "antd";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import "./.css";
import MenuConfigPalierCapture from "./MenuConfigPalierCapture/MenuConfigPalierCapture";
import { IMenuConfigPalier } from "./props";
const { Sider } = Layout;
const MenuConfigPalier: FunctionComponent<IMenuConfigPalier> = (props) => {
  const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const changeBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.design_configuration.background_color =
        e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
    props.setBackgroundColorHeader(e.target.value);
  };
  return (
    <Sider width="300px" className="menu-configuratoin-creation-simulateur">
      <div style={{ padding: "10px" }}>
        <div style={{ marginBottom: "30px" }}>
          <div className="main-title-config-palier-container">
            Configuration du simulateur.
          </div>
          <div className="title-config-palier-conatiner">Couleur du menu:</div>
          <Input
            defaultValue={props.backgroundColorHeader}
            onChange={(e) => changeBackgroundColor(e)}
          />
        </div>
        {props.palierSelected === 0 && (
          <MenuConfigPalierCapture
            simulateurSelected={props.simulateurSelected}
          />
        )}
      </div>
    </Sider>
  );
};

export default MenuConfigPalier;
