import React, {
  FunctionComponent,
  useEffect,
} from "react";
import {
  HomeOutlined,
  LineChartOutlined,
  TeamOutlined,
  StepForwardOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { IListPagesMenu } from "./props";
const ListPagesMenu: FunctionComponent<IListPagesMenu> = (props) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              onClick={() => props.updateContentSelected("Accueil")}
              key="1"
              icon={<HomeOutlined translate="" />}
            >
              Accueil
            </Menu.Item>
            <Menu.Item
              onClick={() => props.updateContentSelected("Statistiques")}
              key="2"
              icon={<LineChartOutlined translate="" />}
            >
              Statistiques globales
            </Menu.Item>
            <Menu.Item
              onClick={() => props.updateContentSelected("Mes simulateurs")}
              key="3"
              icon={<StepForwardOutlined translate="" />}
            >
              Mes simulateurs
            </Menu.Item>
            <Menu.Item
              onClick={() => props.updateContentSelected("Mes articles")}
              key="4"
              icon={<AlignCenterOutlined translate="" />}
            >
              Mes articles
            </Menu.Item>
            <Menu.Item
              onClick={() => props.updateContentSelected("Mes prospects")}
              key="5"
              icon={<TeamOutlined translate="" />}
            >
              Mes prospects
            </Menu.Item>
          </Menu>
  );
};

export default ListPagesMenu;
