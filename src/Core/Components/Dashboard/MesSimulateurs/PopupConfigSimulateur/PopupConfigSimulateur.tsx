import {
  DeleteOutlined,
  FacebookOutlined,
  GoogleOutlined,
  InfoCircleOutlined,
  InfoOutlined,
  ShareAltOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Tooltip,
} from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context, IContext } from "../../../../../Utils/context";
import * as FirebaseHelper from "../../../../../Utils/FirebaseHelper";
import "./.css";
import { IPopupConfigSimulateur } from "./props";
const { Option } = Select;

const PopupConfigSimulateur: FunctionComponent<IPopupConfigSimulateur> = (
  props
) => {
  const monContext: IContext = useContext(Context);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [inputPixelFacebook, setInputPixelFacebook] = useState<string>(
    props.simulateur.pixel_facebook
  );
  const [inputPixelGoogle, setInputPixelGoogle] = useState<string>(
    props.simulateur.pixel_google
  );
  const [devise, setDevise] = useState<string>(props.simulateur.devise);
  const [inputNomSimulateur, setInputNomSimulateur] = useState<string>(
    props.simulateur.Nom
  );
  const [inputPageRgpd, setInputPageRgpd] = useState<string>(
    props.simulateur.lien_rgpd
  );
  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const handleOk = () => {
    if (props.simulateur.public === true && inputPageRgpd === "")
      message.error(
        "Les RGPD sont obligatoires pour mettre en ligne ton simulateur."
      );
    else {
      // On affiche le loading
      setConfirmLoading(true);
      // On verifie si le nom est rempli
      props.simulateur.Nom = inputNomSimulateur;
      props.simulateur.devise = devise;
      props.simulateur.pixel_facebook = inputPixelFacebook;
      props.simulateur.pixel_google = inputPixelGoogle;
      props.simulateur.lien_rgpd = inputPageRgpd;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
      if (props.simulateur.public)
        FirebaseHelper.PublierSimulateur(props.simulateur);
      // On supprime le loading et le modal
      setTimeout(() => {
        setConfirmLoading(false);
        props.setVisible(false);
      }, 1000);
    }
  };
  const deleteSimulateur = () => {
    props.setVisible(false);
    monContext.User.get.simulateurs.splice(props.selectedSimulateur, 1);
    FirebaseHelper.DesactiverSimulateur(props.simulateur);
    FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
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
            defaultValue={props.simulateur.Nom}
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
          <p>ID Pixel Facebook:</p>
          <Input
            defaultValue={props.simulateur.pixel_facebook}
            placeholder="1202819124191566"
            style={{ marginBottom: "10px" }}
            prefix={
              <FacebookOutlined
                translate="yes"
                className="site-form-item-icon"
              />
            }
            suffix={
              <Tooltip title="Id du pixel se trouve dans les paramètres d'évenements de ton Business Manager Facebook.">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
            onChange={(e) => setInputPixelFacebook(e.target.value)}
          />
          <p>Code de suivi Google Analytics:</p>
          <Input
            defaultValue={props.simulateur.pixel_google}
            placeholder="UA-135642749-2"
            style={{ marginBottom: "10px" }}
            prefix={
              <GoogleOutlined translate="yes" className="site-form-item-icon" />
            }
            suffix={
              <Tooltip title="Le code de suivi ce trouve dans les paramètres de suivi de ton compte Google Analytics.">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
            onChange={(e) => setInputPixelGoogle(e.target.value)}
          />
          <p>Lien page RGPD: (obligatoire)</p>
          <Input
            defaultValue={props.simulateur.lien_rgpd}
            placeholder="https://lien-rgpd.fr"
            style={{ marginBottom: "10px" }}
            prefix={
              <InfoOutlined translate="yes" className="site-form-item-icon" />
            }
            suffix={
              <Tooltip title="Ce lien doit rediriger vers ta page RGPD. C'est obligatoire pour récupérer des informations comme le prenom ou l'email d'un prospect.">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
            onChange={(e) => setInputPageRgpd(e.target.value)}
          />
          <p>Devise du simulateur:</p>
          <Select
            defaultValue={props.simulateur.devise}
            style={{ width: 120 }}
            onChange={(e) => setDevise(e)}
          >
            <Option value="€">Euro</Option>
            <Option value="$">Dollar</Option>
          </Select>
          <p style={{ marginTop: "10px" }}>Lien du simulateur:</p>
          <Input
            value={
              props.simulateur.public
                ? "https://master-capture.com/simulateur/" + props.simulateur.Id
                : "Le simulateur n'est pas en ligne."
            }
            style={{ marginBottom: "10px" }}
            prefix={
              <ShareAltOutlined
                translate="yes"
                className="site-form-item-icon"
              />
            }
            suffix={
              <Tooltip title="C'est le lien de ton simulateur. S'il est en mode 'En ligne', tu peux le partager à n'importe qui ! Il arrivera droit sur ton simulateur de capture.">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
          />
          <div style={{ textAlign: "right", marginTop: "40px" }}>
            <Popconfirm
              title="Es-tu sûr de vouloir supprimer ce simulateur ? Il sera impossible de le récupérer."
              onConfirm={deleteSimulateur}
              okText="Oui"
              cancelText="Non"
            >
              <Button danger>
                <DeleteOutlined translate="yes" />
                Supprimer le simulateur
              </Button>
            </Popconfirm>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupConfigSimulateur;
