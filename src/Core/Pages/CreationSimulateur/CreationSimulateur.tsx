import { Button, Layout, message, Modal } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import BodyCreationSimulateur from "src/Core/Components/CreationSimulateur/Body/BodyCreationSimulateur";
import FooterCreationSimulateur from "src/Core/Components/CreationSimulateur/Footer/FooterCreationSimulateur";
import HeaderSimulationCreation from "src/Core/Components/CreationSimulateur/Header/HeaderSimulationCreation";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import "./.css";
import { ICreationSimulateur, IPropsParams } from "./props";

const CreationSimulateur: FunctionComponent<ICreationSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const [autorisation, setAutorisation] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [openTutoSimulateur, setOpenTutoSimulateur] = useState<boolean>(false);
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
      ) {
        setAutorisation(true);
        if (monContext.User.get.tutoriel.createSimulateur) {
          setOpenTutoSimulateur(true);
        }
      }
    }

    return () => {
      //
    };
  }, [monContext.User]);
  const validTutoSimulateur = () => {
    setOpenTutoSimulateur(false);
    monContext.User.get.tutoriel.createSimulateur = false;
    FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
  };
  return (
    <div>
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <h2>C'est encore moi !</h2>
          </div>
        }
        visible={openTutoSimulateur}
        cancelButtonProps={{ disabled: true }}
        // tslint:disable-next-line:jsx-no-lambda
        onCancel={validTutoSimulateur}
        footer={[
          <Button key="submit" type="primary" onClick={validTutoSimulateur}>
            D'accord !
          </Button>,
        ]}
      >
        <p>C'est ici que tu vas créer ton premier simulateur. 💥</p>
        <p>
          ATTENTION: <b>Seulement</b> la partie de gauche te permettra de
          paramétrer ton simulateur.
        </p>
        <p>
          Pour t'aider, j'ai ajouté le visuel de ton simulateur à droite pour
          que tu puisses voir à quoi il ressemble.
        </p>
        <p>
          J'ai déjà pré-rempli quelques trucs, j'espère que ça pourra t'aider à
          structurer ton simulateur !
        </p>
        <p>
          N'oublie pas, tout se passe du côté gauche, la partie droite c'est
          seulement pour faire beau. 😎
        </p>
      </Modal>

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
                <Link to="/">
                  <Button
                    size="large"
                    type="primary"
                    onClick={() => message.success("Simulateur validé !")}
                  >
                    TERMINER
                  </Button>
                </Link>
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
