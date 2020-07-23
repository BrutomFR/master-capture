import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React, { FunctionComponent, useEffect } from "react";
import ImgLogo from "../../../../../Img/logo-bruton-blanc-300x300.png";
import "./.css";
import { ICardSimulateur } from "./props";
const CardSimulateur: FunctionComponent<ICardSimulateur> = (props) => {
  const { Meta } = Card;
  useEffect(() => {
    return () => {
      //
    };
  }, []);
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <SettingOutlined
          translate="yes"
          key="setting"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => props.openPopup(true)}
        />,
        <EditOutlined translate="yes" key="edit" />,
      ]}
    >
      <Meta avatar={<Avatar src={ImgLogo} />} title={props.simulateur.Nom} />
    </Card>
  );
};

export default CardSimulateur;
