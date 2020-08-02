import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Input, InputNumber, Select, Tooltip } from "antd";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import { isNumber } from "util";
import "./.css";
import { IMenuConfigPalierEtapes } from "./props";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;
const MenuConfigPalierEtapes: FunctionComponent<IMenuConfigPalierEtapes> = (
  props
) => {
  const monContext: IContext = useContext(Context);
  useEffect(() => {
    return () => {
      //
    };
  }, []);

  const deleteEtapeInSimulateur = () => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view.splice(
        props.currentEtapeOfSimulateur,
        1
      );
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].question = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changeInformations = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    key: number
  ) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].reponses[key].informations = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const handleChangeTypePrice = (e: string, key: number) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].reponses[key].abonement = e === "false" ? false : true;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changeReponse = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].reponses[key].reponse = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changeNomOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].reponses[key].nom_option = e.target.value;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const changePrice = (e: number | string | undefined, key: number) => {
    if (isNumber(e) && props.simulateurSelected && e)
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].reponses[key].prix = parseInt(e.toString());
    FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
  };
  const addEmptyReponseInEtape = () => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].reponses.push({
        abonement: false,
        informations: "Information sur l'option",
        nom_option: "Nom de l'option",
        prix: 10,
        reponse: "Nom de la réponse",
      });
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  const deleteReponseInEtape = (key: number) => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view[
        props.currentEtapeOfSimulateur
      ].reponses.splice(key, 1);
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };

  return (
    <div style={{ marginBottom: "200px" }}>
      <div className="main-title-config-palier-container">
        Configuration de l'étape séléctionnée.
      </div>
      <div className="title-config-palier-container">Question:</div>
      <Input
        onChange={changeQuestion}
        placeholder={
          props.simulateurSelected.etapes_view[props.currentEtapeOfSimulateur]
            .question
        }
      />
      <div className="title-config-palier-container">Réponses:</div>
      <Collapse accordion bordered={false} defaultActiveKey={["0"]}>
        {props.simulateurSelected.etapes_view[
          props.currentEtapeOfSimulateur
        ].reponses.map((value, key) => {
          return (
            // <div key={key} className="title-reponse-container">
            <Panel header={value.reponse} key={key}>
              <p>Bouton de réponse:</p>
              <Input
                onChange={(e) => changeReponse(e, key)}
                placeholder={value.reponse}
              />
              <p>Informations de la réponse:</p>
              <TextArea
                rows={4}
                onChange={(e) => changeInformations(e, key)}
                placeholder={value.informations}
              />
              <p>
                Nom de l'option:
                <Tooltip title="Le nom de l'option sera affiché à la fin du simulateur dans les tarifs. C'est pour informer votre prospect sur ce qu'il a choisi au cours des étapes.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              </p>
              <Input
                onChange={(e) => changeNomOption(e, key)}
                placeholder={value.nom_option}
              />
              <p>
                Prix:
                <Tooltip title="C'est le prix de l'option que le prospect choisi. Si cela n'a pas de prix tu peux simplement écrire 0.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              </p>

              <InputNumber
                min={1}
                placeholder={value.prix.toString()}
                onChange={(e) => changePrice(e, key)}
              />
              {props.simulateurSelected.devise}

              <p>
                Type de rémunération:
                <Tooltip title="Cette option a un coût ? Définissez le ici. Prix fixe: facture le montant défini une seule fois sur cette option. Prix d'abonnement/mois: facture le montant défini 1 fois par mois sur cette option.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              </p>
              <Select
                defaultValue="false"
                style={{ width: 120 }}
                onChange={(e) => handleChangeTypePrice(e, key)}
              >
                <Option value="false">Prix fixe</Option>
                <Option value="true">Prix d'abonnement/mois</Option>
              </Select>

              <div className="container-delete-button-etape">
                <Button
                  onClick={() => deleteReponseInEtape(key)}
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </div>
            </Panel>
            // </div>
          );
        })}
      </Collapse>
      <Button
        onClick={addEmptyReponseInEtape}
        type="primary"
        shape="circle"
        icon={<PlusCircleOutlined />}
      />
      <div className="container-button-delete-etape">
        <Button
          icon={<DeleteOutlined translate="yes" />}
          onClick={deleteEtapeInSimulateur}
        >
          Supprimer l'étape
        </Button>
      </div>
    </div>
  );
};

export default MenuConfigPalierEtapes;
