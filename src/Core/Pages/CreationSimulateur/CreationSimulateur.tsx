import { Button, Layout, message } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import BodyCreationSimulateur from "src/Core/Components/CreationSimulateur/Body/BodyCreationSimulateur";
import FooterCreationSimulateur from "src/Core/Components/CreationSimulateur/Footer/FooterCreationSimulateur";
import HeaderSimulationCreation from "src/Core/Components/CreationSimulateur/Header/HeaderSimulationCreation";
import { Context, IContext } from "src/Utils/context";
import "./.css";
import { ICreationSimulateur, IPropsParams } from "./props";

const CreationSimulateur: FunctionComponent<ICreationSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const [autorisation, setAutorisation] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const params: IPropsParams = props.match.params;
  const steps = [
    {
      title: "Page de capture",
      content: <div>Page de capture</div>,
    },
    {
      title: "Pages des étapes",
      content: <div>Pages des étapes</div>,
    },
    {
      title: "Page des tarifs",
      content: <div>Page des tarifs</div>,
    },
  ];
  const nextStep = () => setCurrentStep(currentStep + 1);
  const previousStep = () => setCurrentStep(currentStep - 1);

  useEffect(() => {
    if (Object.keys(monContext.User.get).length !== 0) {
      // Evite l'erreur de chercher dans un User vide s'il n'est pas connecté
      if (
        monContext.User.get.simulateurs.find((simulateur) => {
          return simulateur.Id == params.id;
        })
      )
        setAutorisation(true);
    }

    return () => {
      //
    };
  }, [monContext.User]);

  return (
    <div>
      <Layout style={{ overflowY: "hidden" }}>
        <HeaderSimulationCreation />
        {autorisation ? (
          <div
            style={{
              height: "100%",
              marginTop: "65px",
            }}
          >
            <BodyCreationSimulateur
              simulateurId={params.id}
              steps={steps}
              nextStep={nextStep}
              previousStep={previousStep}
              currentStep={currentStep}
            />

            <div className="steps-action">
              {currentStep < steps.length - 1 && (
                <Button size="large" type="primary" onClick={nextStep}>
                  SUIVANT
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  size="large"
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  TERMINER
                </Button>
              )}
              {currentStep > 0 && (
                <Button
                  size="large"
                  style={{ margin: "0 8px" }}
                  onClick={previousStep}
                >
                  PRÉCÉDENT
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ height: "100%" }}>
            Vous n'avez pas accès à ce simulateur.
          </div>
        )}
        <FooterCreationSimulateur currentStep={currentStep} steps={steps} />
      </Layout>
    </div>
  );
};

export default CreationSimulateur;
