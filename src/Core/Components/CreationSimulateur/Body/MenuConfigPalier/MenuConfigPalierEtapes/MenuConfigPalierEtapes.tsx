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
  }, [monContext.User.get]);

  const deleteEtapeInSimulateur = () => {
    if (props.simulateurSelected) {
      props.simulateurSelected.etapes_view.splice(
        props.currentEtapeOfSimulateur,
        1
      );
      props.onChangeEtape(props.currentEtapeOfSimulateur - 1)
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
      {console.log(props.currentEtapeOfSimulateur)}
      <Input
        onChange={changeQuestion}
        defaultValue={
          props.simulateurSelected.etapes_view[props.currentEtapeOfSimulateur]
            .question
        }
        key={props.currentEtapeOfSimulateur}
      />
      <div className="title-config-palier-container">Réponses:</div>
      <Collapse accordion bordered={false} defaultActiveKey={["0"]}>
        {props.simulateurSelected.etapes_view[
          props.currentEtapeOfSimulateur
        ].reponses.map((value, key) => {
          return (
            // <div key={key} className="title-reponse-container">
            <Panel header={value.reponse} key={key}>
              <div className="title-input-config">Bouton de réponse:</div>
              <Input
                onChange={(e) => changeReponse(e, key)}
                defaultValue={value.reponse}
                key={props.currentEtapeOfSimulateur}
              />
              <div className="title-input-config">
                Informations de la réponse:
              </div>
              <TextArea
                rows={4}
                onChange={(e) => changeInformations(e, key)}
                defaultValue={value.informations}
                key={props.currentEtapeOfSimulateur + 1}
              />
              <div className="title-input-config">
                Nom de l'option:
                <Tooltip title="Le nom de l'option sera affiché à la fin du simulateur dans les tarifs. C'est pour informer votre prospect sur ce qu'il a choisi au cours des étapes.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              </div>
              <Input
                onChange={(e) => changeNomOption(e, key)}
                defaultValue={value.nom_option}
                key={props.currentEtapeOfSimulateur + 2}
              />
              <div className="title-input-config">
                Prix:
                <Tooltip title="C'est le prix de l'option que le prospect choisi. Si cela n'a pas de prix tu peux simplement écrire 0.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              </div>

              <InputNumber
                defaultValue={value.prix}
                key={props.currentEtapeOfSimulateur + 3}
                min={0}
                onChange={(e) => changePrice(e, key)}
              />
              {props.simulateurSelected.devise}

              <div className="title-input-config">
                Type de rémunération:
                <Tooltip title="Cette option a un coût ? Définissez le ici. Prix fixe: facture le montant défini une seule fois sur cette option. Prix d'abonnement/mois: facture le montant défini 1 fois par mois sur cette option.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              </div>
              <Select
                defaultValue={value.abonement.toString()}
                key={props.currentEtapeOfSimulateur + 4}
                style={{ width: 120 }}
                onChange={(e) => handleChangeTypePrice(e, key)}
              >
                <Option value="false">Prix fixe</Option>
                <Option value="true">Prix d'abonnement/mois</Option>
              </Select>

              <div className="container-delete-button-etape">
                <Button
                  danger
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
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          backgroundColor: "#fafafa",
        }}
      >
        <Button
          onClick={addEmptyReponseInEtape}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          Ajouter une réponse
        </Button>
      </div>

      <div className="container-button-delete-etape">
        <Button
          danger
          icon={<DeleteOutlined translate="yes" />}
          onClick={deleteEtapeInSimulateur}
          style={{ width: "100%" }}
        >
          Supprimer l'étape
        </Button>
      </div>
    </div>
  );
};

export default MenuConfigPalierEtapes;
