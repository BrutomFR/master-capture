import { InfoCircleOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Tooltip } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import IPages_Simulations from "src/Core/Interfaces/User/ISimulateur";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import { IPopupNewSimulateur } from "./props";

const { Option } = Select;
const PopupNewSimulateur: FunctionComponent<IPopupNewSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [devise, setDevise] = useState<string>("€");
  const [inputNomSimulateur, setInputNomSimulateur] = useState<string>("");

  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const handleOk = () => {
    // On affiche le loading
    setConfirmLoading(true);
    let simulateur: IPages_Simulations = {
      Nom: inputNomSimulateur,
      Id: Date.now(),
      etapes_view: [{
        question: "Question",
        titre_progressbar: "Titre Etape",
        reponses: [], 
        
      }],
      statistiques_simulateurs: [],
      prospects: [],
      pixel_facebook: "",
      pixel_google: "",
      devise: devise,
      design_configuration: {
        background_color: "#0582ca",
      },
      etape_capture: {
        titre: "Titre de votre page",
        texte_accroche: "Text d'accroche",
        email_capture: "Votre email",
        prenom: "Votre prenom",
      }
    };
    monContext.User.get.simulateurs.push(simulateur);
    FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    setTimeout(() => {
      setConfirmLoading(false);
      props.setVisible(false);
    }, 1000);
  };
  return (
    <div>
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <h2>Configuration</h2>
          </div>
        }
        visible={props.visible}
        confirmLoading={confirmLoading}
        cancelButtonProps={{ disabled: true }}
        // tslint:disable-next-line:jsx-no-lambda
        onCancel={() => props.setVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Valider
          </Button>,
        ]}
      >
        <div className="content-modal">
          <p>Nom du simulateur:</p>
          <Input
            style={{ marginBottom: "10px" }}
            prefix={
              <StepForwardOutlined
                translate="yes"
                className="site-form-item-icon"
              />
            }
            suffix={
              <Tooltip title="C'est un nom pour te repérer. Seulement toi le verra.">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
            onChange={(e) => setInputNomSimulateur(e.target.value)}
          />

          <p>Devise de votre simulateur:</p>
          <Select
            style={{ width: 120 }}
            defaultValue={devise}
            onChange={(e) => setDevise(e)}
          >
            <Option value="€">€</Option>
            <Option value="$">$</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default PopupNewSimulateur;
