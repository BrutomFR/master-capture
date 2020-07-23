import {
  AlignCenterOutlined,
  HomeOutlined,
  LineChartOutlined,
  StepForwardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { FunctionComponent, useEffect } from "react";
import { IListPagesMenu } from "./props";
const ListPagesMenu: FunctionComponent<IListPagesMenu> = (props) => {
  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => {
          props.updateContentSelected("Accueil");
        }}
        key="1"
        icon={<HomeOutlined translate="yes" />}
      >
        Accueil
      </Menu.Item>
      <Menu.Item
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => props.updateContentSelected("Statistiques")}
        key="2"
        icon={<LineChartOutlined translate="yes" />}
      >
        Statistiques globales
      </Menu.Item>
      <Menu.Item
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => props.updateContentSelected("Mes simulateurs")}
        key="3"
        icon={<StepForwardOutlined translate="yes" />}
      >
        Mes simulateurs
      </Menu.Item>
      <Menu.Item 
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => props.updateContentSelected("Mes articles")}
        key="4"
        icon={<AlignCenterOutlined translate="yes" />}
      >
        Mes articles
      </Menu.Item>
      <Menu.Item
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => props.updateContentSelected("Mes prospects")}
        key="5"
        icon={<TeamOutlined translate="yes" />}
      >
        Mes prospects
      </Menu.Item>
    </Menu>
  );
};

export default ListPagesMenu;
