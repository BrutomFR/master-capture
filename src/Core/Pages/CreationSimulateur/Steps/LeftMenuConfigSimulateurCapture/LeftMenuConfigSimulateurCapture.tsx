// import { Context, IContext } from "../Utils/context";
import { Layout } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useContext,
} from "react";
import "./.css";
import { ILeftMenuConfigSimulateurCapture } from "./props";
const { Sider } = Layout;
const LeftMenuConfigSimulateurCapture: FunctionComponent<ILeftMenuConfigSimulateurCapture> = (
  props
) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <Sider width="300px"className="menu-configuratoin-creation-simulateur">
      <div>Configuration de la page de capture</div>
    </Sider>
  );
};

export default LeftMenuConfigSimulateurCapture;
