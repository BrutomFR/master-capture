import {
  BarChartOutlined,
  EditOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, message, Switch, Tooltip } from "antd";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context, IContext } from "src/Utils/context";
import * as FirebaseHelper from "src/Utils/FirebaseHelper";
import ImgLogo from "../../../../../Img/logo-bruton-blanc-300x300.png";
import "./.css";
import { ICardSimulateur } from "./props";
const CardSimulateur: FunctionComponent<ICardSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const { Meta } = Card;
  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const onChange = (checked: boolean, event: MouseEvent) => {
    if (checked) {
      if (props.simulateur.lien_rgpd != "") {
        FirebaseHelper.PublierSimulateur(props.simulateur);
        props.simulateur.public = true;
        FirebaseHelper.UpdateClient(
          monContext.Auth.get.uid,
          monContext.User.get
        );
        message.success(
          "Le simulateur: " + props.simulateur.Nom + " est en ligne !"
        );
      } else
        message.error(
          "Pour te protéger, il faut d'abord configurer les RGPD du simulateur avant de le publier."
        );
    } else {
      message.success(
        "Le simulateur: " + props.simulateur.Nom + " n'est plus en ligne !"
      );
      FirebaseHelper.DesactiverSimulateur(props.simulateur);
      props.simulateur.public = false;
      FirebaseHelper.UpdateClient(monContext.Auth.get.uid, monContext.User.get);
    }
  };
  return (
    <Card
      extra={
        <div>
          <Tooltip title="Mettre en ligne son simulateur signifie qu'il sera disponible au public. Tu pourras le partager via le lien se trouvant dans les paramètres du simulateur. S'il est hors ligne, personne ne pourra le voir.">
            <InfoCircleOutlined
              translate="yes"
              style={{ color: "rgba(0,0,0,.45)", marginRight: "10px" }}
            />
          </Tooltip>
          <span style={{ marginRight: "10px" }}>
            {props.simulateur.public ? "En ligne" : "Hors ligne"}
          </span>
          <Switch
            onChange={(e, value) => onChange(e, value)}
            checked={props.simulateur.public}
          />
        </div>
      }
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <SettingOutlined
          translate="yes"
          key="setting"
          onClick={() => props.openPopupConfig(true)}
        />,
        <Link to={"/simulateur/" + props.simulateur.Id}>
          <EditOutlined translate="yes" key="edit" />
        </Link>,
        <BarChartOutlined
          translate="yes"
          key="stats"
          onClick={() => props.openPopupStatistiques(true)}
        />,
      ]}
    >
      <Meta avatar={<Avatar src={ImgLogo} />} title={props.simulateur.Nom} />
    </Card>
  );
};

export default CardSimulateur;
