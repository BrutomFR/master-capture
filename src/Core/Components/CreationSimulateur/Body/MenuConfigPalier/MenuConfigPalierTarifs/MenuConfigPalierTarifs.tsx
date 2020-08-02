import { Button } from "antd";
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
import { IMenuConfigPalierTarifs } from "./props";

const MenuConfigPalierTarifs: FunctionComponent<IMenuConfigPalierTarifs> = (
  props
) => {
  const monContext: IContext = useContext(Context);
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const [openColorPickerPlan, setOpenColorPickerPlan] = useState<boolean>(
    false
  );
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
      props.simulateurSelected.etape_tarifs.color_tarifs = color.hex;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
    props.setBackgroundTarifsColor(color.hex);
  };
  const handleColorPlanChange = (
    color: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etape_tarifs.color_plans_tarifs = color.hex;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
    props.setBackgroundTarifsPlanColor(color.hex);
  };
  return (
    <div style={{ marginBottom: "200px" }}>
      <div className="main-title-config-palier-container">
        Configuration des tarifications.
      </div>
      <div className="title-config-palier-container">Couleur principale:</div>
      <Button onClick={() => setOpenColorPicker(!openColorPicker)}>
        Ouvrir
      </Button>
      {openColorPicker && (
        <ChromePicker
          onChangeComplete={(color, event) => handleColorChange(color, event)}
          color={props.backgroundTarifsColor}
        />
      )}
      <div className="title-config-palier-container">Couleur secondaire:</div>
      <Button onClick={() => setOpenColorPickerPlan(!openColorPickerPlan)}>
        Ouvrir
      </Button>
      {openColorPickerPlan && (
        <ChromePicker
          onChangeComplete={(color, event) =>
            handleColorPlanChange(color, event)
          }
          color={props.backgroundTarifsPlanColor}
        />
      )}
    </div>
  );
};

export default MenuConfigPalierTarifs;
