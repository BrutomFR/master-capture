import { Button, Col, Layout, Row, Tooltip } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useContext,
} from "react";
import "./.css";
const { Header } = Layout;
// import { Context, IContext } from "../Utils/context";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ImgLogo from "src/Img/logo-bruton-blanc-300x300.png";
import { IHeaderSimulationCreation } from "./props";
const HeaderSimulationCreation: FunctionComponent<IHeaderSimulationCreation> = (
  props
) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <Header
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
      className="header-creation-simulateur"
    >
      <Row>
        <Col span={8}>
          <Link to="/">
            <Button icon={<LeftOutlined translate="yes" />} />
          </Link>
          <img
            style={{ width: "40px", marginLeft: "20px", marginRight: "20px" }}
            src={ImgLogo}
            alt="master-capture-brutom"
          />
          Création de simulateur
        </Col>
        <Col style={{ textAlign: "right" }} span={8} offset={8}>
          <Tooltip title="Le simulateur se met à jour directement à chaque modifications que tu fais. Pas besoin de sauvegarder, pas de perte de données !"><div className="dot" /></Tooltip>
          Modifications en live
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderSimulationCreation;
