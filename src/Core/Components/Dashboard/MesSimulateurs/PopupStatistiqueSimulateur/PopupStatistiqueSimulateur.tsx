import { InfoCircleOutlined } from "@ant-design/icons";
import { ChartCard, Field, MiniArea } from "ant-design-pro/lib/Charts";
import { Button, Col, Modal, Row, Tooltip } from "antd";
import moment from "moment";
import numeral from "numeral";
import React, { FunctionComponent, useEffect } from "react";
import "./.css";
import { IPopupStatistiqueSimulateur } from "./props";

const PopupStatistiqueSimulateur: FunctionComponent<IPopupStatistiqueSimulateur> = (
  props
) => {
  useEffect(() => {
    return () => {
      //
    };
  }, []);

  const visitData = [];
  const beginDay = new Date().getTime();
  for (let i = 0; i < 20; i += 1) {
    visitData.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
        "YYYY-MM-DD"
      ),
      y: Math.floor(Math.random() * 100) + 10,
    });
  }
  const visible = () => props.setVisible(false);
  return (
    <div>
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <h2>Statistiques de {props.simulateur.Nom}</h2>
          </div>
        }
        visible={props.visible}
        cancelButtonProps={{ disabled: true }}
        onCancel={visible}
        width="90%"
        footer={[
          <Button key="back" onClick={visible}>
            Fermer
          </Button>,
        ]}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <ChartCard
              title={<div>Taux de conversion</div>}
              action={
                <Tooltip title="La moyenne entre le taux d'emails capturés et de simulateurs terminées.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              }
              total={<div>1.05%</div>}
              footer={<Field label="Aujourd'hui:" value="1.5%" />}
              contentHeight={60}
            >
              <div>Email: 3.85%</div>
              <div>Simulateur: 0.75%</div>
            </ChartCard>
          </Col>
          <Col span={6}>
            <ChartCard
              title={<div>Visiteurs</div>}
              contentHeight={60}
              action={
                <Tooltip title="Correspond au nombre de visiteur sur le/les simulateurs séléctionnés au dessus">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              }
              total={<div>{numeral(1568).format("0,0")}</div>}
              footer={
                <Field
                  label="Aujourd'hui:"
                  value={numeral(563).format("0,0")}
                />
              }
            >
              <MiniArea line height={60} data={visitData} />
            </ChartCard>
          </Col>
          <Col span={6}>
            <ChartCard
              title={<div>Capture d'emails</div>}
              contentHeight={60}
              action={
                <Tooltip title="Correspond au nombre de prospects ayant laissé leur email sur le/les simulateurs séléctionnés au dessus.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              }
              total={<div>{numeral(85).format("0,0")}</div>}
              footer={
                <Field label="Aujourd'hui:" value={numeral(14).format("0,0")} />
              }
            >
              <MiniArea line height={60} data={visitData} />
            </ChartCard>
          </Col>
          <Col span={6}>
            <ChartCard
              title={<div>Simulateurs remplis</div>}
              contentHeight={60}
              action={
                <Tooltip title="Correspond au nombre de simulateurs terminés sur le/les simulateurs séléctionnés au dessus.">
                  <InfoCircleOutlined translate="yes" />
                </Tooltip>
              }
              total={<div>{numeral(45).format("0,0")}</div>}
              footer={
                <Field label="Aujourd'hui:" value={numeral(5).format("0,0")} />
              }
            >
              <MiniArea line height={60} data={visitData} />
            </ChartCard>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default PopupStatistiqueSimulateur;
