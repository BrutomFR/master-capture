import {
  ExclamationCircleTwoTone,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Modal, Tooltip } from "antd";
import { Input } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context, IContext } from "../../../Utils/context";
import * as FirebaseHelper from "../../../Utils/FirebaseHelper";
import { IUser } from "../../Interfaces/IUser";
import "./.css";
import { IPopupNewUser } from "./props";
const PopupNewUser: FunctionComponent<IPopupNewUser> = (props) => {
  const monContext: IContext = useContext(Context);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [inputNom, setInputNom] = useState<string>("");
  const [inputPrenom, setInputPrenom] = useState<string>("");
  useEffect(() => {
    // On affiche le modal à 1.5 sec
    setTimeout(() => {
      setVisible(true);
    }, 1500);
    return () => {
      //
    };
  }, []);
  const handleOk = () => {
    // On affiche le loading
    setConfirmLoading(true);
    // On verifie si le nom est le prenom sont rempli
    if (inputNom.length > 3 && inputPrenom.length > 3) {
      // On ajoute le nom/prenom dans le user bdd
      const user: IUser = {
        Nom: inputNom,
        Prenom: inputPrenom,
        tutoriel: {
          createSimulateur: monContext.User.get.tutoriel.createSimulateur,
          newUser: false,
        },
        simulateurs: [],
      };
      FirebaseHelper.CreateClient(monContext.Auth.get.uid, user);
      message.success(user.Prenom + ", bienvenue à toi sur Master Capture !");
      // On supprime le loading et le modal
      setTimeout(() => {
        setConfirmLoading(false);
        setVisible(false);
      }, 2000);
    } else {
      setTimeout(() => setConfirmLoading(false), 2000);
    }
  };
  return (
    <div>
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <h2>
              <ExclamationCircleTwoTone translate="yes" /> Hey, bienvenue à toi
              !
            </h2>
          </div>
        }
        visible={visible}
        confirmLoading={confirmLoading}
        cancelButtonProps={{ disabled: true }}
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
          <h3>
            Si tu vois ce message, c'est que tu es nouveau.{" "}
            <span role="img">🙌</span>
          </h3>
          <p>
            Avant de commencer à utiliser Master Capture, pourrais-tu me donner
            ton nom et ton prénom s'il te plaît ?
          </p>
          <Input
            placeholder="Prenom"
            style={{ marginBottom: "10px" }}
            prefix={
              <UserOutlined translate="yes" className="site-form-item-icon" />
            }
            suffix={
              <Tooltip title="Ton prénom va me servir pour te parler plus facilement sur ton Dashboard !">
                <InfoCircleOutlined
                  translate="yes"
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            }
            // tslint:disable-next-line:jsx-no-lambda
            onChange={(e) => setInputPrenom(e.target.value)}
          />
          <Input
            placeholder="Nom"
            prefix={
              <UserOutlined translate="yes" className="site-form-item-icon" />
            }
            // tslint:disable-next-line:jsx-no-lambda
            onChange={(e) => setInputNom(e.target.value)}
            onPressEnter={handleOk}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PopupNewUser;
