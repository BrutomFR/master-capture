import { Layout, Steps } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  useState,
  // useContext,
} from "react";
import IEtapeDuSimulateur from "src/Core/Interfaces/Others/IEtapeDuSimulateur";
import "./.css";
// import { Context, IContext } from "../Utils/context";
import { IEtapesDuSimulateur } from "./props";
const { Step } = Steps;
const { Header } = Layout;
const EtapesDuSimulateur: FunctionComponent<IEtapesDuSimulateur> = (props) => {
  // const monContext: IContext = useContext(Context);
  const [etapesDuSimulateur, setEtapesDuSimulateur] = useState<
    IEtapeDuSimulateur[]
  >([]);
  const [currentEtapeOfSimulateur, setCurrentEtapeOfSimulateur] = useState<
    number
  >(0);
  useEffect(() => {
    setEtapesDuSimulateur([
      {
        title: "Etape 1",
        subTitle: "00:00:05",
        description: "This is a description.",
      },
      {
        title: "Etape 2",
        subTitle: "00:00:05",
        description: "This is a description.",
      },
      {
        title: "Etape 3",
        subTitle: "00:00:05",
        description: "This is a description.",
      },
      {
        title: "Etape 4",
        subTitle: "00:00:05",
        description: "This is a description.",
      },
    ]);
    return () => {
      //
    };
  }, []);

  const onChangeEtape = (currentStep: number) =>
    setCurrentEtapeOfSimulateur(currentStep);
  return (
    <div>
      <Header className="header-steps-of-simulateur">
        <Steps
          type="navigation"
          size="small"
          current={currentEtapeOfSimulateur}
          onChange={onChangeEtape}
          className="site-navigation-steps"
        >
          {etapesDuSimulateur.map((s, i) => (
            <Step key={i} title={<div>{s.title} </div>} status="finish" />
          ))}
        </Steps>
      </Header>
      <div>TEST</div>
    </div>
  );
};

export default EtapesDuSimulateur;
