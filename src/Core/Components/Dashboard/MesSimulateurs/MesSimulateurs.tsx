import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Switch, Tooltip } from "antd";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context, IContext } from "../../../../Utils/context";
import "./.css";
import CardSimulateur from "./CardSimulateur/CardSimulateur";
import PopupConfigSimulateur from "./PopupConfigSimulateur/PopupConfigSimulateur";
import PopupStatistiqueSimulateur from "./PopupStatistiqueSimulateur/PopupStatistiqueSimulateur";
import { IMesSimulateurs } from "./props";
import RechartsSimulateur from "./RechartsSimulateur/RechartsSimulateur";

const MesSimulateurs: FunctionComponent<IMesSimulateurs> = (props) => {
  const monContext: IContext = useContext(Context);

  const [configSimulateurPopup, setConfigSimulateurPopup] = useState<boolean>(
    false
  ); // POPUP CONFIG OPEN
  const [statsSimulateurPopup, setStatSimulateurPopup] = useState<boolean>(
    false
  ); // POPUP CONFIG OPEN
  const [selectedSimulateur, setSelectedSimulateur] = useState<number>(-1); // Index du simulateur séléctionné
  const [switchChecked, setSwitchChecked] = useState<boolean>(true); // Séléctionne tous les simulateurs
  useEffect(() => {
    selectedSimulateur !== -1
      ? setSwitchChecked(false)
      : setSwitchChecked(true);
    return () => {
      //
    };
  }, [selectedSimulateur]);

  return (
    <div className="container-mes-simulateur">
      {configSimulateurPopup ? (
        <PopupConfigSimulateur
          visible={configSimulateurPopup}
          setVisible={setConfigSimulateurPopup}
          simulateur={monContext.User.get.pages_simulations[selectedSimulateur]}
        />
      ) : null}
      {statsSimulateurPopup ? (
        <PopupStatistiqueSimulateur
          visible={statsSimulateurPopup}
          setVisible={setStatSimulateurPopup}
          simulateur={monContext.User.get.pages_simulations[selectedSimulateur]}
        />
      ) : null}
      <div className="site-card-wrapper">
        <RechartsSimulateur selectedSimulateur={selectedSimulateur} />
        <div className="container-card-simulateur">
          <Card title="Mes simulateurs:" bordered={true}>
            <Row
              gutter={{
                md: 24,
                sm: 16,
                xs: 8,
              }}
            >
              {monContext.User.get.pages_simulations.map((value, i) => (
                <Col key={i}>
                  <div
                    onClick={() => {
                      // tslint:disable-next-line:jsx-no-lambda
                      setSelectedSimulateur(i);
                    }}
                  >
                    <CardSimulateur
                      openPopupStatistiques={setStatSimulateurPopup}
                      openPopupConfig={setConfigSimulateurPopup}
                      simulateur={value}
                    />
                  </div>
                </Col>
              ))}
            </Row>
            <div className="container-button-add-simulateur">
              <Tooltip title="Ajouter un simulateur">
                <Button
                  size="large"
                  shape="circle"
                  icon={<PlusOutlined translate="yes" />}
                />
              </Tooltip>
            </div>
          </Card>
        </div>
        <div className="container-card-simulateur">
          <Card title="Mes statistiques:" bordered={true}>
            <div className="header-statistiques">
              Tous les simulateurs:
              <Switch
                checked={switchChecked}
                onChange={(e) => {
                  // tslint:disable-next-line:jsx-no-lambda
                  // tslint:disable-next-line:no-unused-expression
                  e ? setSelectedSimulateur(-1) : null;
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MesSimulateurs;
