import { Layout } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useState,
  // useContext,
} from "react";
import "./.css";
import EtapesDuSimulateur from "./EtapesDuSimulateur/EtapesDuSimulateur";
// import { Context, IContext } from "../Utils/context";
import { IStepsContent } from "./props";
const { Content, Sider } = Layout;
const StepsContent: FunctionComponent<IStepsContent> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <Layout>
      <Sider>Sider</Sider>
      <Content>
        {props.currentStep === 0 ? ( // SI C'EST PAGE DE TARIF
          <div>
            <div className="steps-content">
              {props.steps[props.currentStep].content}
            </div>
          </div>
        ) : props.currentStep === 1 ? ( // SI C'EST PAGE DES ETAPES DU SIMULATEUR
          <div>
            <EtapesDuSimulateur />
          </div>
        ) : (
          props.currentStep === 2 && ( // SI C'EST PAGE DES TARIFS
            <div className="steps-content">
              {props.steps[props.currentStep].content}
            </div>
          )
        )}
      </Content>
    </Layout>
  );
};

export default StepsContent;
