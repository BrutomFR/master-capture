import { InfoCircleOutlined } from "@ant-design/icons";
import { ChartCard, Field, MiniArea } from "ant-design-pro/lib/Charts";
import { Select, Tooltip } from "antd";
import numeral from "numeral";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "src/Core/Interfaces/IUser";
import { IDataGraphique } from "src/Core/Interfaces/Others/IDataGraphique";
import { Context, IContext } from "../../../../../Utils/context";
import { IPage_View } from "../../../../Interfaces/User/Pages_Simulations/IPage_View";
import "./.css";
import { IStatistiquesSimulateurs } from "./props";
const { Option } = Select;

const StatistiquesSimulateurs: FunctionComponent<IStatistiquesSimulateurs> = (
  props
) => {
  const monContext: IContext = useContext(Context);
  const [dateSelected, setDateSelected] = useState<number>(30);
  const [statistiques, setStatistiques] = useState<IPage_View[]>([]); // All stats
  // STATS DES JOURS SELECTIONNES
  const [visiteurs, setVisiteurs] = useState<number>(0); // nbr de visiteurs du/des simulateurs
  const [emails, setEmails] = useState<number>(0); // nbr d'email capturés du/des simulateurs
  const [simulateurs, setSimulateurs] = useState<number>(0); // nbr de simulateurs terminée
  // STATS DES JOURS SELECTIONNES GRAPHIQUE
  const [visiteursGraphique, setVisiteursGraphique] = useState<
    IDataGraphique[]
  >([]);
  const [emailsGraphique, setEmailsGraphique] = useState<IDataGraphique[]>([]);
  const [simulateursValideGraphique, setSimulateursValideGraphique] = useState<
    IDataGraphique[]
  >([]);
  useEffect(() => {
    getStatsAllSimulateurs();
    return () => {};
  }, [monContext.User, dateSelected]);

  const dateNow =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();
  const getStatsAllSimulateurs = () => {
    let stats: IPage_View[] = [];
    let visitorsGraphique: IDataGraphique[] = [];
    let mailsGraphique: IDataGraphique[] = [];
    let simulatorsValideGraphique: IDataGraphique[] = [];

    let visitors = 0;
    let mails = 0;
    let simulators = 0;

    const t: IUser = JSON.parse(JSON.stringify(monContext.User.get));

    t.pages_simulations.forEach((simulateur) => {
      // On boucle les simulateurs du client
      simulateur.page_view.forEach((day: IPage_View) => {
        // On boucle les jours du simulateur
        let findIfDayExist = stats.find((d) => d.date === day.date);

        if (findIfDayExist != null) {
          // Une date existe déjà
          // On additionne la journée
          findIfDayExist.nbrCaptureEmail += day.nbrCaptureEmail;
          findIfDayExist.nbrSimulateurValide += day.nbrSimulateurValide;
          findIfDayExist.nbrVisiteur += day.nbrVisiteur;
        } else {
          // Si elle n'existe pas on ajoute la date
          stats.push(day);
        }
      });
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
    setVisiteurs(visitors);
    setEmails(mails);
    setSimulateurs(simulators);
    setVisiteursGraphique(visitorsGraphique);
    setEmailsGraphique(mailsGraphique);
    setSimulateursValideGraphique(simulatorsValideGraphique);
  };

  return (
    <div style={{ width: "100%" }}>
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
      <div className="row">
        <div className="column">
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
                    (simulateurs / visiteurs) * 100) /
                  2
                ).toFixed(2)}
                %
              </div>
            }
            footer={<Field label="Aujourd'hui:" value={"-"} />}
            contentHeight={60}
          >
            <div>Email: {((emails / visiteurs) * 100).toFixed(2)}%</div>
            <div>
              Simulateur: {((simulateurs / visiteurs) * 100).toFixed(2)}%
            </div>
          </ChartCard>
        </div>
        <div className="column">
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
        </div>
        <div className="column">
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
                  statistiques?.find((d) => d.date === dateNow)?.nbrCaptureEmail
                ).format("0,0")}
              />
            }
          >
            <MiniArea line height={60} data={emailsGraphique} />
          </ChartCard>
        </div>
        <div className="column">
          <ChartCard
            title={<div>Simulateurs remplis</div>}
            contentHeight={60}
            action={
              <Tooltip title="Correspond au nombre de simulateurs terminés sur le/les simulateurs séléctionnés au dessus.">
                <InfoCircleOutlined translate="yes" />
              </Tooltip>
            }
            total={<div>{numeral(simulateurs).format("0,0")}</div>}
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
        </div>
      </div>
    </div>
  );
};

export default StatistiquesSimulateurs;
