import { Button, Steps } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import "./.css";
import { IHeaderSimulateur } from "./props";
const { Step } = Steps;
const HeaderSimulateur: FunctionComponent<IHeaderSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const [classNameStep, setClassNameStep] = useState<string>("");
  const [typeStep, setTypeStep] = useState<string>("default");

  useEffect(() => {
    props.isEtapesStep && setClassNameStep("site-navigation-steps");
    props.isEtapesStep && setTypeStep("navigation");
    return () => {
      //
    };
  }, []);
  const addEtapeOnSimulateur = () => {
    props.simulateurSelected?.etapes_view.push({
      information: {
        description: "",
        titre: "",
        valide: false,
      },
      question: "Nouvelle question.",
      reponses: [],
      titre_progressbar: "Nouvelle étape",
    });
    FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
  };
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
        {props.simulateurSelected?.etapes_view.map((s, i) => (
          <Step
            key={i}
            title={<div>{s.titre_progressbar} </div>}
            status="finish"
          />
        ))}
      </Steps>
      {props.isEtapesStep && (
        <Button style={{ marginTop: "20px" }} onClick={addEtapeOnSimulateur}>
          Ajouter une étape
        </Button>
      )}
    </div>
  );
};

export default HeaderSimulateur;
