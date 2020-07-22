import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import { Context, IContext } from "../../../../../Utils/context";
import { IRechartsSimulateur } from "./props";
import "./.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as FirebaseHelper from "../../../../../Utils/FirebaseHelper";
import { IUser } from "../../../../Interfaces/IUser";
import { IPage_View } from "../../../../Interfaces/User/Pages_Simulations/IPage_View";

const RechartsSimulateur: FunctionComponent<IRechartsSimulateur> = (props) => {
  const monContext: IContext = useContext(Context);
  const [dataRecharts, setDataRecharts] = useState<IPage_View[]>();
  useEffect(() => {
    getDataForRecharts();
    return () => {};
  }, [props.selectedSimulateur]);
  const getDataForRecharts = () => {
    FirebaseHelper.GetClient(monContext.Auth.get.uid).subscribe((u) => {
      const User: IUser = u as IUser;
      const _dataForRecharts: IPage_View[] = [];

      if (props.selectedSimulateur === -1) {
        // GET ALL SIMULATEURS STATISTIQUES
        User.pages_simulations.forEach((simulateur) =>
          simulateur.page_view.forEach((day) => {
            if (_dataForRecharts.find((d) => d.date === day.date)) {
              const d = _dataForRecharts.find(
                (d) => d.date === day.date
              ) as IPage_View;
              d.nbrCaptureEmail += day.nbrCaptureEmail;
              d.nbrSimulateurValide += day.nbrSimulateurValide;
              d.nbrVisiteur += day.nbrVisiteur;
            } else
              _dataForRecharts.push({
                date: day.date,
                nbrVisiteur: day.nbrVisiteur,
                nbrSimulateurValide: day.nbrSimulateurValide,
                nbrCaptureEmail: day.nbrCaptureEmail,
              });
          })
        );
      } else {
        // GET SIMULATEUR SELECTED
        User.pages_simulations[props.selectedSimulateur].page_view.forEach(
          (day) =>
            _dataForRecharts.push({
              date: day.date,
              nbrVisiteur: day.nbrVisiteur,
              nbrSimulateurValide: day.nbrSimulateurValide,
              nbrCaptureEmail: day.nbrCaptureEmail,
            })
        );
      }
      // console.log(_dataForRecharts);
      setDataRecharts(_dataForRecharts);
    });
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
            stroke="#82ca9d"
          />
          <Line type="monotone" dataKey="nbrCaptureEmail" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsSimulateur;
