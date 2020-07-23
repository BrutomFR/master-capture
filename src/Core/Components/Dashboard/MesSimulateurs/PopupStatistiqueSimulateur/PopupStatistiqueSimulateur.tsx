import { InfoCircleOutlined } from "@ant-design/icons";
import { ChartCard, Field, MiniArea } from "ant-design-pro/lib/Charts";
import { Button, Col, Modal, Row, Select, Tooltip } from "antd";
import numeral from "numeral";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { IDataGraphique } from "src/Core/Interfaces/Others/IDataGraphique";
import { IPage_View } from "src/Core/Interfaces/User/Pages_Simulations/IPage_View";
import { Context, IContext } from "src/Utils/context";
import "./.css";
import { IPopupStatistiqueSimulateur } from "./props";
const { Option } = Select;

const PopupStatistiqueSimulateur: FunctionComponent<IPopupStatistiqueSimulateur> = (
  props
) => {
  const monContext: IContext = useContext(Context);
  const [dateSelected, setDateSelected] = useState<number>(30);
  const [statistiques, setStatistiques] = useState<IPage_View[]>([]); // All stats
  const [visiteurs, setVisiteur] = useState<number>(0);
  const [emails, setEmails] = useState<number>(0);
  const [simulateursValide, setSimulateursValide] = useState<number>(0);
  const [visiteursGraphique, setVisiteursGraphique] = useState<
    IDataGraphique[]
  >([]);
  const [emailsGraphique, setEmailsGraphique] = useState<IDataGraphique[]>([]);
  const [simulateursValideGraphique, setSimulateursValideGraphique] = useState<
    IDataGraphique[]
  >([]);
  useEffect(() => {
    getStatsAllSimulateurs();
    return () => {
      //
    };
  }, [monContext.User, dateSelected]);
  const dateNow =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();
  const getStatsAllSimulateurs = () => {
    let visitors = 0;
    let mails = 0;
    let simulators = 0;

    let stats: IPage_View[] = [];
    let visitorsGraphique: IDataGraphique[] = [];
    let mailsGraphique: IDataGraphique[] = [];
    let simulatorsValideGraphique: IDataGraphique[] = [];

    monContext.User.get.pages_simulations[
      props.simulateurIndex
    ].page_view.forEach((day) => {
      stats.push(day);
    });
    stats.slice(Math.max(stats.length - dateSelected, 0)).forEach((d) => {
      visitorsGraphique.push({
        x: d.date,
        y: d.nbrVisiteur,
      });
      mailsGraphique.push({
        x: d.date,
        y: d.nbrCaptureEmail,
      });
      simulatorsValideGraphique.push({
        x: d.date,
        y: d.nbrSimulateurValide,
      });
      visitors += d.nbrVisiteur;
      mails += d.nbrCaptureEmail;
      simulators += d.nbrSimulateurValide;
    });
    setStatistiques(stats);
    setVisiteur(visitors);
    setEmails(mails);
    setSimulateursValide(simulators);
    setVisiteursGraphique(visitorsGraphique);
    setEmailsGraphique(mailsGraphique);
    setSimulateursValideGraphique(simulatorsValideGraphique);
  };

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
        <Select
          className="select-days-statistiques"
          defaultValue="30 derniers jours"
          style={{ width: 200 }}
          onChange={(e) => setDateSelected(parseInt(e))}
        >
          <Option value="30">30 derniers jours</Option>
          <Option value="90">3 derniers mois</Option>
          <Option value="180">6 derniers mois</Option>
          <Option value="365">12 derniers mois</Option>
        </Select>
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
                <div>
                  {(
                    ((emails / visiteurs) * 100 +
                      (simulateursValide / visiteurs) * 100) /
                    2
                  ).toFixed(2)}
                  %
                </div>
              }
              footer={<Field label="Aujourd'hui:" value="-" />}
              contentHeight={60}
            >
              <div>Email: {((emails / visiteurs) * 100).toFixed(2)}%</div>
              <div>
                Simulateur: {((simulateursValide / visiteurs) * 100).toFixed(2)}
                %
              </div>
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
              total={<div>{numeral(visiteurs).format("0,0")}</div>}
              footer={
                <Field
                  label="Aujourd'hui:"
                  value={numeral(
                    statistiques?.find((d) => d.date === dateNow)?.nbrVisiteur
                  ).format("0,0")}
                />
              }
            >
              <MiniArea line height={60} data={visiteursGraphique} />
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
              total={<div>{numeral(emails).format("0,0")}</div>}
              footer={
                <Field
                  label="Aujourd'hui:"
                  value={numeral(
                    statistiques?.find((d) => d.date === dateNow)
                      ?.nbrCaptureEmail
                  ).format("0,0")}
                />
              }
            >
              <MiniArea line height={60} data={emailsGraphique} />
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
              total={<div>{numeral(simulateursValide).format("0,0")}</div>}
              footer={
                <Field
                  label="Aujourd'hui:"
                  value={numeral(
                    statistiques?.find((d) => d.date === dateNow)
                      ?.nbrSimulateurValide
                  ).format("0,0")}
                />
              }
            >
              <MiniArea line height={60} data={simulateursValideGraphique} />
            </ChartCard>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default PopupStatistiqueSimulateur;
