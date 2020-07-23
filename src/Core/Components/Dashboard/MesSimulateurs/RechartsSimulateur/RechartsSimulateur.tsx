/* import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"; */
import { InfoCircleOutlined } from "@ant-design/icons";
import { ChartCard, Field, MiniArea } from "ant-design-pro/lib/Charts";
import { Col, Row, Tooltip } from "antd";
import moment from "moment";
import numeral from "numeral";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context, IContext } from "../../../../../Utils/context";
import { IPage_View } from "../../../../Interfaces/User/Pages_Simulations/IPage_View";
import "./.css";
import { IRechartsSimulateur } from "./props";
const RechartsSimulateur: FunctionComponent<IRechartsSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const [dataRecharts, setDataRecharts] = useState<IPage_View[]>();
  useEffect(() => {
    getDataForRecharts();
    return () => {
      //
      console.log(dataRecharts);
    };
  }, [props.selectedSimulateur]);
  const getDataForRecharts = () => {
    const dataForRecharts: IPage_View[] = [];
    if (props.selectedSimulateur === -1) {
      // GET ALL SIMULATEURS STATISTIQUES
      monContext.User.get.pages_simulations.forEach((simulateur) =>
        simulateur.page_view.forEach((day) => {
          if (dataForRecharts.find((d) => d.date === day.date)) {
            const d = dataForRecharts.find(
              // tslint:disable-next-line:no-shadowed-variable
              (d: IPage_View) => d.date === day.date
            ) as IPage_View;
            d.nbrCaptureEmail += day.nbrCaptureEmail;
            d.nbrSimulateurValide += day.nbrSimulateurValide;
            d.nbrVisiteur += day.nbrVisiteur;
          } else {
            dataForRecharts.push({
              date: day.date,
              nbrCaptureEmail: day.nbrCaptureEmail,
              nbrSimulateurValide: day.nbrSimulateurValide,
              nbrVisiteur: day.nbrVisiteur,
            });
          }
        })
      );
    } else {
      // GET SIMULATEUR SELECTED
      monContext.User.get.pages_simulations[
        props.selectedSimulateur
      ].page_view.forEach((day) =>
        dataForRecharts.push({
          date: day.date,
          nbrCaptureEmail: day.nbrCaptureEmail,
          nbrSimulateurValide: day.nbrSimulateurValide,
          nbrVisiteur: day.nbrVisiteur,
        })
      );
    }
    // console.log(_dataForRecharts);
    setDataRecharts(dataForRecharts);
  };

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
  return (
    <div style={{ width: "100%" }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <ChartCard
            title={<div>Taux de conversion</div>}
            action={
              <Tooltip title="La moyenne entre le taux d'emails capturés et de simulateurs terminées.">
                <InfoCircleOutlined translate="yes" />
              </Tooltip>
            }
            total={
              <Tooltip title="">
                <div>1.95%</div>
              </Tooltip>
            }
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
              <Field label="Aujourd'hui:" value={numeral(563).format("0,0")} />
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

      {/* 
      <ResponsiveContainer>
        <LineChart
          width={window.innerWidth * 0.68}
          height={300}
          data={dataRecharts}
          margin={{
            top: 5,
            // tslint:disable-next-line:object-literal-sort-keys
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="nbrVisiteur"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="nbrSimulateurValide"
            stroke="#111111"
          />
          <Line type="monotone" dataKey="nbrCaptureEmail" stroke="#82ca9d" />
        </LineChart>
        </ResponsiveContainer> */}
    </div>
  );
};

export default RechartsSimulateur;
