import { LeftOutlined } from "@ant-design/icons";
import { Button, Layout, message, Steps } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { Context, IContext } from "src/Utils/context";
import "./.css";
import { ICreationSimulateur, IPropsParams } from "./props";
import StepsContent from "./Steps/StepsContent";

const { Header, Footer } = Layout;
const { Step } = Steps;
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
    if (Object.keys(monContext.User.get).length !== 0)
      monContext.User.get.pages_simulations.find(
        (simulateur) => simulateur.Id === params.id
      ) && setAutorisation(true);

    return () => {
      //
    };
  }, []);

  return (
    <div>
      {autorisation ? (
        <Layout>
          <Header className="header-creation-simulateur">
            <Link to="/">
              <Button icon={<LeftOutlined translate="yes" />} />
            </Link>
            Header
          </Header>

          <StepsContent
            steps={steps}
            nextStep={nextStep}
            previousStep={previousStep}
            currentStep={currentStep}
          />

          <div className="steps-action">
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={previousStep}>
                Previous
              </Button>
            )}
          </div>
          <Footer>
            <Steps current={currentStep}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Footer>
        </Layout>
      ) : (
        <div>Connectez vous pour accéder au simulateur.</div>
      )}
    </div>
  );
};

export default CreationSimulateur;
