import { Button, Layout } from "antd";
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
      <Link to="/">
        <Button icon={<LeftOutlined translate="yes" />} />
      </Link>
      <img
        style={{ width: "40px", marginLeft: "20px", marginRight: "20px" }}
        src={ImgLogo}
        alt="master-capture-brutom"
      />
      Création de simulateur
    </Header>
  );
};

export default HeaderSimulationCreation;
