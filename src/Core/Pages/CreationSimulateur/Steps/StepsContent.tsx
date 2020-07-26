import { Layout } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  // useState,
  useState,
} from "react";
import IEtapeDuSimulateur from "src/Core/Interfaces/Others/IEtapeDuSimulateur";
import { Context, IContext } from "src/Utils/context";
import "./.css";
import CapturePage from "./EtapesDuSimulateur/CapturePage/CapturePage";
import EtapesDuSimulateur from "./EtapesDuSimulateur/EtapesDuSimulateur";
import LeftMenuConfigSimulateurCapture from "./LeftMenuConfigSimulateurCapture/LeftMenuConfigSimulateurCapture";
import LeftMenuConfigSimulateurEtapes from "./LeftMenuConfigSimulateurEtapes/LeftMenuConfigSimulateurEtapes";
import LeftMenuConfigSimulateurTarifs from "./LeftMenuConfigSimulateurTarifs/LeftMenuConfigSimulateurTarifs";
import { IStepsContent } from "./props";
const { Content } = Layout;
const StepsContent: FunctionComponent<IStepsContent> = (props) => {
  const monContext: IContext = useContext(Context);
  const [backgroundColorHeader, setBackgroundColorHeader] = useState<string>(
    "#0582ca"
  );
  const [etapesDuSimulateur, setEtapesDuSimulateur] = useState<
    IEtapeDuSimulateur[]
  >([]);
  const [currentEtapeOfSimulateur, setCurrentEtapeOfSimulateur] = useState<
    number
  >(0);
  useEffect(() => {
    let etapes: IEtapeDuSimulateur[] = [];
    monContext.User.get.pages_simulations
      .find((simu) => simu.Id == props.simulateurId)
      ?.etapes_view.forEach((etape) => {
        etapes.push({
          title: etape.titre_progressbar,
        });
      });
    setEtapesDuSimulateur(etapes);
    return () => {
      //
    };
  }, []);
  const onChangeEtape = (currentStep: number) =>
    setCurrentEtapeOfSimulateur(currentStep);
  return (
    <Layout>
      {props.currentStep === 0 ? ( // SI C'EST PAGE DE CAPTURE
        <LeftMenuConfigSimulateurCapture
          backgroundColorHeader={backgroundColorHeader}
          setBackgroundColorHeader={setBackgroundColorHeader}
        />
      ) : props.currentStep === 1 ? ( // SI C'EST PAGE DES ETAPES DU SIMULATEUR
        <LeftMenuConfigSimulateurEtapes />
      ) : (
        props.currentStep === 2 && <LeftMenuConfigSimulateurTarifs /> // SI C'EST PAGE DES TARIFS
      )}

      <Content>
        {props.currentStep === 0 ? ( // SI C'EST PAGE DE CAPTURE
          <CapturePage
            backgroundColorHeader={backgroundColorHeader}
            etapesDuSimulateur={etapesDuSimulateur}
            setCurrentEtapeOfSimulateur={setCurrentEtapeOfSimulateur}
            setEtapesDuSimulateur={setEtapesDuSimulateur}
            currentEtapeOfSimulateur={currentEtapeOfSimulateur}
            onChangeEtape={onChangeEtape}
          />
        ) : props.currentStep === 1 ? ( // SI C'EST PAGE DES ETAPES DU SIMULATEUR
          <EtapesDuSimulateur
            backgroundColorHeader={backgroundColorHeader}
            etapesDuSimulateur={etapesDuSimulateur}
            setCurrentEtapeOfSimulateur={setCurrentEtapeOfSimulateur}
            setEtapesDuSimulateur={setEtapesDuSimulateur}
            currentEtapeOfSimulateur={currentEtapeOfSimulateur}
            onChangeEtape={onChangeEtape}
          />
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
