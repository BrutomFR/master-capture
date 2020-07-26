import { Steps } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  useState,
  // useContext,
} from "react";
import "./.css";
// import { Context, IContext } from "../Utils/context";
import { IHeaderSimulateur } from "./props";
const { Step } = Steps;
const HeaderSimulateur: FunctionComponent<IHeaderSimulateur> = (props) => {
  // const monContext: IContext = useContext(Context);
  const [classNameStep, setClassNameStep] = useState<string>("");
  const [typeStep, setTypeStep] = useState<string>("default");

  useEffect(() => {
    props.isEtapesStep && setClassNameStep("site-navigation-steps");
    props.isEtapesStep && setTypeStep("navigation");
    return () => {
      //
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: props.backgroundColorHeader }}
      className="header-simulateur"
    >
      <h1>Étapes:</h1>
      <Steps
        type={typeStep as "navigation" | "default"}
        size="small"
        current={props.currentEtapeOfSimulateur}
        onChange={props.onChangeEtape}
        className={classNameStep}
      >
        {props.etapesDuSimulateur.map((s, i) => (
          <Step key={i} title={<div>{s.title} </div>} status="finish" />
        ))}
      </Steps>
    </div>
  );
};

export default HeaderSimulateur;
