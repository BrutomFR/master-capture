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
      etapes_view: [
        {
          question: "Avez-vous déjà une page Facebook ?",
          titre_progressbar: "Page Facebook",
          reponses: [
            {
              abonement: false,
              reponse: "Oui",
              informations:
                "Vous avez déjà une page Facebook professionnelle qui représente votre entreprise. Il suffira simplement de <b>me donner accès au droit d'administrateur sur votre page</b>. Un pdf avec les étapes en images vous sera fourni pour la manipulation.",
              nom_option: "Création de page Facebook",
              prix: 0,
            },
            {
              abonement: false,
              reponse: "Non, j'ai besoin d'une création de page Facebook",
              informations:
                "Je m'occupe de <b>créer votre page Facebook Professionnelle</b>. Je vous demanderez les informations nécessaires de votre entreprise pour remplir toutes les informations de la page.",
              nom_option: "Création de page Facebook",
              prix: 30,
            },
          ],
        },
      ],
      statistiques_simulateurs: [],
      prospects: [],
      pixel_facebook: "",
      pixel_google: "",
      devise: devise,
      design_configuration: {
        background_color: "#0582ca",
      },
      etape_capture: {
        titre: "GARDEZ LE CONTRÔLE EN 7 CLICS !",
        texte_accroche:
          "<p>Calculez <b>gratuitement le prix de la création</b> et d'accompagnement personnalisé de vos <b>campagnes publicitaires sur mesure</b></p><p><b>Estimez le coût de création</b> et de gestion de vos publicités sur Facebook en <b>seulement 7 étapes</b> !</p>",
        email_capture: "Votre email",
        prenom: "Votre prénom",
        button_valide: "C'EST PARTI !",
      },
      etape_tarifs: {
        tarifs: [],
        color_tarifs: "#0582ca",
        color_plans_tarifs: "#57A1CB",
      },
      public: false,
      lien_rgpd: "",
      id_user: monContext.Auth.get.uid,
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
            onPressEnter={handleOk}
            style={{ marginBottom: "10px" }}
            prefix={
              <StepForwardOutlined
                translate="yes"
                className="site-form-item-icon"
              />
            }
            suffix={
              <Tooltip title="C'est un nom pour te repérer. Seulement toi le verras.">
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
