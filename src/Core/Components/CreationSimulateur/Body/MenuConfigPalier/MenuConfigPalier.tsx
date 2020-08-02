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
import MenuConfigPalierTarifs from "./MenuConfigPalierTarifs/MenuConfigPalierTarifs";
import { IMenuConfigPalier } from "./props";
const { Sider } = Layout;
const MenuConfigPalier: FunctionComponent<IMenuConfigPalier> = (props) => {
  const monContext: IContext = useContext(Context);
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  useEffect(() => {
    if (props.simulateurSelected.public)
      FirebaseHelper.PublierSimulateur(props.simulateurSelected);
    return () => {
      //
    };
  }, [props.simulateurSelected]);

  const handleColorChange = (
    color: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.design_configuration.background_color =
        color.hex;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
    props.setBackgroundColorHeader(color.hex);
  };
  return (
    <Sider width="350px" className="menu-configuratoin-creation-simulateur">
      <div style={{ padding: "10px", height: "100%" }}>
        <div style={{ marginBottom: "30px" }}>
          {props.palierSelected !== 2 && (
            <div>
              <div className="main-title-config-palier-container">
                Configuration du simulateur.
              </div>
              <div className="title-config-palier-conatiner">
                Couleur du menu:
              </div>
              <Button onClick={() => setOpenColorPicker(!openColorPicker)}>
                Choisir
              </Button>
            </div>
          )}
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
        {props.palierSelected === 2 && (
          <MenuConfigPalierTarifs
            simulateurSelected={props.simulateurSelected}
            currentEtapeOfSimulateur={props.currentEtapeOfSimulateur}
            setBackgroundTarifsColor={props.setBackgroundTarifsHeaderColor}
            backgroundTarifsColor={props.backgroundTarifsHeaderColor}
            backgroundTarifsPlanColor={props.backgroundTarifsPlanColor}
            setBackgroundTarifsPlanColor={props.setBackgroundTarifsPlanColor}
          />
        )}
      </div>
    </Sider>
  );
};

export default MenuConfigPalier;
