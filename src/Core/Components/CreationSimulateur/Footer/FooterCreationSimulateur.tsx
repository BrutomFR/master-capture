import { Layout, Steps } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useContext,
} from "react";

import "./.css";
// import { Context, IContext } from "../Utils/context";
import { IFooterCreationSimulateur } from "./props";

const { Step } = Steps;
const { Footer } = Layout;
const FooterCreationSimulateur: FunctionComponent<IFooterCreationSimulateur> = (
  props
) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <Footer
      style={{
        position: "sticky",
        bottom: "0",
        borderTop: "solid",
        borderColor: "#1890ff",
      }}
    >
      <Steps current={props.currentStep}>
        {props.steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
    </Footer>
  );
};

export default FooterCreationSimulateur;
