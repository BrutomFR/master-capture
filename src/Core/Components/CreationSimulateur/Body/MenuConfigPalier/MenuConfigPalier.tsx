import { Button, Layout } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChromePicker } from "react-color";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import "./.css";
import MenuConfigPalierCapture from "./MenuConfigPalierCapture/MenuConfigPalierCapture";
import MenuConfigPalierEtapes from "./MenuConfigPalierEtapes/MenuConfigPalierEtapes";
import { IMenuConfigPalier } from "./props";
const { Sider } = Layout;
const MenuConfigPalier: FunctionComponent<IMenuConfigPalier> = (props) => {
  const monContext: IContext = useContext(Context);
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      //
    };
  }, []);

  const handleColorChange = (
    color: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.design_configuration.background_color =
        color.hex;
      console.log(monContext.User.get);
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
    props.setBackgroundColorHeader(color.hex);
  };
  return (
    <Sider width="350px" className="menu-configuratoin-creation-simulateur">
      <div style={{ padding: "10px", height: "100%" }}>
        <div style={{ marginBottom: "30px" }}>
          <div className="main-title-config-palier-container">
            Configuration du simulateur.
          </div>
          <div className="title-config-palier-conatiner">Couleur du menu:</div>
          <Button onClick={() => setOpenColorPicker(!openColorPicker)}>
            Choisir
          </Button>
          {openColorPicker && (
            <ChromePicker
              onChangeComplete={(color, event) =>
                handleColorChange(color, event)
              }
              color={props.backgroundColorHeader}
            />
          )}
        </div>
        {props.palierSelected === 0 && (
          <MenuConfigPalierCapture
            simulateurSelected={props.simulateurSelected}
          />
        )}
        {props.palierSelected === 1 && (
          <MenuConfigPalierEtapes
            simulateurSelected={props.simulateurSelected}
            currentEtapeOfSimulateur={props.currentEtapeOfSimulateur}
          />
        )}
      </div>
    </Sider>
  );
};

export default MenuConfigPalier;
