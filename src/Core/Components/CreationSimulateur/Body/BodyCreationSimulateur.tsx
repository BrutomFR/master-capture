import { Layout } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  // useState,
  useState,
} from "react";
import IEtapeDuSimulateur from "src/Core/Interfaces/Others/IEtapeDuSimulateur";
import ISimulateur from "src/Core/Interfaces/User/ISimulateur";
import { Context, IContext } from "src/Utils/context";
import "./.css";
import MenuConfigPalier from "./MenuConfigPalier/MenuConfigPalier";
import PalierCapture from "./PalierCapture/PalierCapture";
import PalierEtapes from "./PalierEtapes/PalierEtapes";
import { IBodyCreationSimulateur } from "./props";
const { Content } = Layout;
const BodyCreationSimulateur: FunctionComponent<IBodyCreationSimulateur> = (
  props
) => {
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
  const [etapeSelected, setEtapeSelected] = useState<number>(0);
  const [simulateurSelected, setSimulateurSelected] = useState<ISimulateur>(
    {} as ISimulateur
  );
  useEffect(() => {
    let simu = monContext.User.get.simulateurs.find(
      (simu) => simu.Id == props.simulateurId
    );
    if (simu) {
      setSimulateurSelected(simu);
      setBackgroundColorHeader(simu.design_configuration.background_color);
    }
    let etapes: IEtapeDuSimulateur[] = [];
    monContext.User.get.simulateurs
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
  }, [monContext.User.get]);
  const onChangeEtape = (currentStep: number) =>
    setCurrentEtapeOfSimulateur(currentStep);
  return (
    <div style={{ height: "100%" }}>
      {simulateurSelected.Id != undefined && (
        <Layout>
          {props.currentStep === 0 ? ( // SI C'EST PALIER DE CAPTURE
            <MenuConfigPalier
              backgroundColorHeader={backgroundColorHeader}
              setBackgroundColorHeader={setBackgroundColorHeader}
              palierSelected={0}
              simulateurSelected={simulateurSelected}
              currentEtapeOfSimulateur={currentEtapeOfSimulateur}
            />
          ) : props.currentStep === 1 ? ( // SI C'EST PALIER DES ETAPES DU SIMULATEUR
            <MenuConfigPalier
              backgroundColorHeader={backgroundColorHeader}
              setBackgroundColorHeader={setBackgroundColorHeader}
              etapeConfigSelected={
                simulateurSelected?.etapes_view[currentEtapeOfSimulateur]
              }
              simulateurSelected={simulateurSelected}
              palierSelected={1}
              currentEtapeOfSimulateur={currentEtapeOfSimulateur}
            />
          ) : (
            props.currentStep === 2 && (
              <MenuConfigPalier
                backgroundColorHeader={backgroundColorHeader}
                setBackgroundColorHeader={setBackgroundColorHeader}
                palierSelected={2}
                simulateurSelected={simulateurSelected}
                currentEtapeOfSimulateur={currentEtapeOfSimulateur}
              />
            ) // SI C'EST PALIER DES TARIFS
          )}

          <Content>
            {props.currentStep === 0 ? ( // SI C'EST PALIER DE CAPTURE
              <PalierCapture
                backgroundColorHeader={backgroundColorHeader}
                etapesDuSimulateur={etapesDuSimulateur}
                setCurrentEtapeOfSimulateur={setCurrentEtapeOfSimulateur}
                setEtapesDuSimulateur={setEtapesDuSimulateur}
                currentEtapeOfSimulateur={currentEtapeOfSimulateur}
                onChangeEtape={onChangeEtape}
                etapeSelected={etapeSelected}
                setEtapeSelected={setEtapeSelected}
                simulateurSelected={simulateurSelected}
              />
            ) : props.currentStep === 1 ? ( // SI C'EST PALIER DES ETAPES DU SIMULATEUR
              <PalierEtapes
                backgroundColorHeader={backgroundColorHeader}
                etapesDuSimulateur={etapesDuSimulateur}
                setCurrentEtapeOfSimulateur={setCurrentEtapeOfSimulateur}
                setEtapesDuSimulateur={setEtapesDuSimulateur}
                currentEtapeOfSimulateur={currentEtapeOfSimulateur}
                onChangeEtape={onChangeEtape}
                etapeSelected={etapeSelected}
                setEtapeSelected={setEtapeSelected}
                simulateurSelected={simulateurSelected}
              />
            ) : (
              props.currentStep === 2 && ( // SI C'EST PALIER DES TARIFS
                <div className="steps-content">
                  {props.steps[props.currentStep].content}
                </div>
              )
            )}
          </Content>
        </Layout>
      )}
    </div>
  );
};

export default BodyCreationSimulateur;
