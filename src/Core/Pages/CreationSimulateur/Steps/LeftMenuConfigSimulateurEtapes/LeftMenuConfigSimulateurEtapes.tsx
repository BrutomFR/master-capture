// import { Context, IContext } from "../Utils/context";
import { Layout } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useContext,
} from "react";
import "./.css";
import { ILeftMenuConfigSimulateurEtapes } from "./props";
const { Sider } = Layout;
const LeftMenuConfigSimulateurEtapes: FunctionComponent<ILeftMenuConfigSimulateurEtapes> = (
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
      <div>Configuration des etapes</div>
    </Sider>
  );
};

export default LeftMenuConfigSimulateurEtapes;
