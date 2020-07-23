import {
  FacebookOutlined,
  GoogleOutlined,
  InfoCircleOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Tooltip } from "antd";
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
  const [inputPixelFacebook, setInputPixelFacebook] = useState<string>(props.simulateur.pixel_facebook);
  const [inputPixelGoogle, setInputPixelGoogle] = useState<string>(props.simulateur.pixel_google);
  const [devise, setDevise] = useState<string>(props.simulateur.devise);
  const [inputNomSimulateur, setInputNomSimulateur] = useState<string>(props.simulateur.Nom);
  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const handleOk = () => {
    // On affiche le loading
    setConfirmLoading(true);
    // On verifie si le nom est rempli
      props.simulateur.Nom = inputNomSimulateur;
      props.simulateur.devise = devise;
      props.simulateur.pixel_facebook = inputPixelFacebook;
      props.simulateur.pixel_google = inputPixelGoogle;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get)
      // On supprime le loading et le modal
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
            defaultValue={props.simulateur.Nom}
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
            // tslint:disable-next-line:jsx-no-lambda
            onChange={(e) => setInputNomSimulateur(e.target.value)}
          />
          <p>ID Pixel Facebook:</p>
          <Input
            defaultValue={props.simulateur.pixel_facebook}
            placeholder="1202819124191566"
            style={{ marginBottom: "10px" }}
            prefix={
              <FacebookOutlined translate="yes" className="site-form-item-icon" />
            }
            suffix={
              <Tooltip title="C'est un nom pour te repérer. Seulement toi le verra.">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
            // tslint:disable-next-line:jsx-no-lambda
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
              <Tooltip title="C'est un nom pour te repérer. Seulement toi le verra.">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
            // tslint:disable-next-line:jsx-no-lambda
            onChange={(e) => setInputPixelGoogle(e.target.value)}
          />
          <p>Devise de votre simulateur:</p>
          <Select
            defaultValue={props.simulateur.devise}
            style={{ width: 120 }}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={(e) => setDevise(e)}
          >
            <Option value="€">Euro</Option>
            <Option value="$">Dollar</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default PopupConfigSimulateur;
