import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

  return (
    <div style={{ width: "100%", height: 300 }}>
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
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsSimulateur;
