import {
  BarChartOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React, { FunctionComponent, useEffect } from "react";
import { Link } from 'react-router-dom';
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
          onClick={() => props.openPopupConfig(true)}
        />,
        <Link to ={"/simulateur/" + props.simulateur.Id}><EditOutlined translate="yes" key="edit" /></Link>,
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
