// import { Context, IContext } from "../Utils/context";
import { Layout } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useContext,
} from "react";
import "./.css";
import { ILeftMenuConfigSimulateurTarifs } from "./props";
const { Sider } = Layout;
const LeftMenuConfigSimulateurTarifs: FunctionComponent<ILeftMenuConfigSimulateurTarifs> = (
  props
) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <Sider width="300px" className="menu-configuratoin-creation-simulateur">
      <div>Configuration de la page des tarifs</div>
    </Sider>
  );
};

export default LeftMenuConfigSimulateurTarifs;
