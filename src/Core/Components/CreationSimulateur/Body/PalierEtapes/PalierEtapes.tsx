import { QuestionCircleOutlined } from "@ant-design/icons";
// tslint:disable-next-line:ordered-imports
import { Button, Col, Row } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useState,
  // useContext,
} from "react";
import HeaderSimulateur from "../SimulateurLive/Header/HeaderSimulateur";
import "./.css";
// import { Context, IContext } from "../Utils/context";
import { IPalierEtapes } from "./props";

const PalierEtapes: FunctionComponent<IPalierEtapes> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <HeaderSimulateur
        currentEtapeOfSimulateur={props.currentEtapeOfSimulateur}
        backgroundColorHeader={props.backgroundColorHeader}
        onChangeEtape={props.onChangeEtape}
        isEtapesStep={true}
        simulateurSelected={props.simulateurSelected}
      />
      <div style={{ paddingBottom: "145px" }}>
        <div className="container-live-simulateur">
          <h1
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              margin: "10px",
              marginBottom: "25px",
            }}
          >
            {
              props.simulateurSelected.etapes_view[
                props.currentEtapeOfSimulateur
              ].question
            }
          </h1>
          <Row
            justify="center"
            gutter={{
              md: 24,
              sm: 16,
              xs: 8,
            }}
          >
            {props.simulateurSelected.etapes_view[
              props.currentEtapeOfSimulateur
            ].reponses.map((value, i) => (
              <Col span={12} key={i}>
                <Button
                  size="large"
                  block
                  type="primary"
                  style={{
                    borderColor: "#3cb371",
                    backgroundColor: "#3cb371",
                    marginTop: "40px",
                  }}
                >
                  {value.reponse}
                </Button>
                <QuestionCircleOutlined style={{ fontSize: "50px", padding: "20px" }} />
                <div
                  style={{ fontSize: "17px" }}
                  dangerouslySetInnerHTML={{
                    __html: value.informations,
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PalierEtapes;
