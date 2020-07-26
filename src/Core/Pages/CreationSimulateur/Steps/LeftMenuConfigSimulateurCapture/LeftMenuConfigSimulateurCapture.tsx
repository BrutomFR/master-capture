// import { Context, IContext } from "../Utils/context";
import { Input, Layout } from "antd";
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
        
      </div>
    </Sider>
  );
};

export default LeftMenuConfigSimulateurCapture;
