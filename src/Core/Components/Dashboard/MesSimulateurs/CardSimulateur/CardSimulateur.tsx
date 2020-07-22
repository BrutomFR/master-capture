import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import { Context, IContext } from "../../../../../Utils/context";
import { ICardSimulateur } from "./props";
import "./.css";
import { Card, Avatar, Col, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ImgLogo from "../../../../../Img/logo-bruton-blanc-300x300.png";
const CardSimulateur: FunctionComponent<ICardSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const { Meta } = Card;
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Card
      style={{ width: 250, marginTop: 16 }}
      actions={[
        <SettingOutlined translate="" key="setting" />,
        <EditOutlined translate="" key="edit" />,
      ]}
    >
      <Meta
        avatar={<Avatar src={ImgLogo} />}
        title={props.simulateur.Nom}
        description="This is the description"
      />
    </Card>
  );
};

export default CardSimulateur;
