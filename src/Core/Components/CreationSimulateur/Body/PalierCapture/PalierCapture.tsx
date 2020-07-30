import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { FunctionComponent, useEffect } from "react";
// import { Context, IContext } from "src/Utils/context";
import HeaderSimulateur from "../SimulateurLive/Header/HeaderSimulateur";
import "./.css";
import { IPalierCapture } from "./props";
const PalierCapture: FunctionComponent<IPalierCapture> = (props) => {
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
        isEtapesStep={false}
        simulateurSelected={props.simulateurSelected}
      />
      <div className="container-live-simulateur">
        <h1
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            margin: "10px",
            marginBottom: "25px",
          }}
        >
          {props.simulateurSelected?.etape_capture.titre}
        </h1>
        {props.simulateurSelected && (
          <p>
            <span
              style={{ fontSize: "17px" }}
              dangerouslySetInnerHTML={{
                __html: props.simulateurSelected?.etape_capture.texte_accroche,
              }}
            />
          </p>
        )}
        <div>
          <p style={{ marginTop: "20px" }}>
            {props.simulateurSelected?.etape_capture.prenom}:
          </p>
          <Input
            size="large"
            placeholder="Thomas"
            prefix={<UserOutlined translate="yes" />}
          />
          <p style={{ marginTop: "20px" }}>
            {props.simulateurSelected?.etape_capture.email_capture}:
          </p>
          <Input
            size="large"
            placeholder="email@gmail.com"
            prefix={<MailOutlined translate="yes" />}
          />
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
            {props.simulateurSelected?.etape_capture.button_valide}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PalierCapture;
