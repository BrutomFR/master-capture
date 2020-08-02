// import { Context, IContext } from "../../../../Utils/context";
import { Timeline } from "antd";
import React, {
  FunctionComponent,
  // useState,
  useEffect,
  // useContext,
} from "react";
import "./.css";
import { IAccueil } from "./props";

const Accueil: FunctionComponent<IAccueil> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div className="container-time-line-news">
      <h2>Fil d'actualités</h2>
      <div className="time-line-news">
        <Timeline>
          <Timeline.Item color="green">
            <p>02-08-2020: Création de la partie simulateur.</p>
          </Timeline.Item>
          <Timeline.Item color="green">
            <p>16-07-2020: Création de la plate-forme master capture.</p>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};

export default Accueil;
