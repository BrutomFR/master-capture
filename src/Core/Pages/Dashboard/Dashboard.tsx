import { MenuOutlined } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import ImgLogo from "../../../Img/logo-bruton-blanc-300x300.png";
import { Context, IContext } from "../../../Utils/context";
import Accueil from "../../Components/Dashboard/Accueil/Accueil";
import ProfileMenu from "../../Components/Dashboard/Header/ProfileMenu/ProfileMenu";
import ListPagesMenu from "../../Components/Dashboard/Menu/ListPagesMenu";
import MesSimulateurs from "../../Components/Dashboard/MesSimulateurs/MesSimulateurs";
import PopupNewUser from "../../Components/PopupNewUser/PopupNewUser";
import "./.css";
import { IDashboard } from "./props";

const { Header, Sider, Content } = Layout;
const Dashboard: FunctionComponent<IDashboard> = (props) => {
  const monContext: IContext = useContext(Context);
  const [collapsed, setCollapsed] = useState<boolean>(
    monContext.SizeScreenUser.get < 900 ? true : false
  );
  const [contentSelected, setContentSelected] = useState<string>("Accueil");
  useEffect(() => {
    return () => {
      //
    };
  }, []);
  const toggle = () => setCollapsed(!collapsed);
  return (
    <div>
      {monContext.User.get && <PopupNewUser />}
      <Layout>
        {monContext.SizeScreenUser.get < 500 ? (
          <div>MOBILE DETECTE: CREER MENU POUR RECUPERER LA PLACE !!!</div>
        ) : (
          <Sider trigger={null} collapsible={true} collapsed={collapsed}>
            <div onClick={toggle} className="menu-left">
              <MenuOutlined
                translate="yes"
                className="trigger"
                style={{
                  color: "white",
                  fontSize: "25px",
                }}
              />
            </div>
            <div className="header-logo-brutom">
              <img
                className="logo-brutom-menu"
                src={ImgLogo}
                alt="brutom-logo"
              />
            </div>
            <ListPagesMenu updateContentSelected={setContentSelected} />
          </Sider>
        )}

        <Layout className="site-layout">
          <Header className="site-layout-background header">
            <Row>
              <Col span={8}>
                <h3>Bienvenue {monContext.User.get.Prenom} !</h3>
              </Col>
              <Col span={8}></Col>
              <Col span={8} className="profile-menu">
                <ProfileMenu />
              </Col>
            </Row>
          </Header>
          <Content style={{ minHeight: "auto" }}>
            {contentSelected === "Accueil" ? (
              <Accueil />
            ) : contentSelected === "Mes simulateurs" ? (
              <MesSimulateurs />
            ) : (
              <div>N'existe pas</div>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
