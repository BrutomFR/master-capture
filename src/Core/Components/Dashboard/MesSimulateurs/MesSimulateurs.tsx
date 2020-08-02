import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Tooltip } from "antd";
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
import PopupNewSimulateur from "./PopupNewSimulateur/PopupNewSimulateur";
import PopupStatistiqueSimulateur from "./PopupStatistiqueSimulateur/PopupStatistiqueSimulateur";
import { IMesSimulateurs } from "./props";
import StatistiquesSimulateurs from "./StatistiquesSimulateurs/StatistiquesSimulateurs";

const MesSimulateurs: FunctionComponent<IMesSimulateurs> = (props) => {
  const monContext: IContext = useContext(Context);
  // POPUP CONFIG OPEN
  const [configSimulateurPopup, setConfigSimulateurPopup] = useState<boolean>(
    false
  ); // POPUP STATS OPEN
  const [statsSimulateurPopup, setStatSimulateurPopup] = useState<boolean>(
    false
  ); // POPUP NEW SIMULATEUR OPEN
  const [newSimulateurPopup, setNewSimulateurPopup] = useState<boolean>(false);
  const [selectedSimulateur, setSelectedSimulateur] = useState<number>(-1); // Index du simulateur séléctionné

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div className="container-mes-simulateur">
      {configSimulateurPopup && (
        <PopupConfigSimulateur
          visible={configSimulateurPopup}
          setVisible={setConfigSimulateurPopup}
          simulateur={monContext.User.get.simulateurs[selectedSimulateur]}
          selectedSimulateur={selectedSimulateur}
        />
      )}
      {statsSimulateurPopup && (
        <PopupStatistiqueSimulateur
          visible={statsSimulateurPopup}
          setVisible={setStatSimulateurPopup}
          simulateur={monContext.User.get.simulateurs[selectedSimulateur]}
          simulateurIndex={selectedSimulateur}
        />
      )}
      {newSimulateurPopup && (
        <PopupNewSimulateur
          visible={newSimulateurPopup}
          setVisible={setNewSimulateurPopup}
        />
      )}
      <div className="site-card-wrapper">
        <StatistiquesSimulateurs selectedSimulateur={selectedSimulateur} />
        <div className="container-card-simulateur">
          <Card title="Mes simulateurs:" bordered={true}>
            <Row
              justify="center"
              gutter={{
                md: 24,
                sm: 16,
                xs: 8,
              }}
            >
              {monContext.User.get.simulateurs.map((value, i) => (
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
                  onClick={() => setNewSimulateurPopup(true)}
                />
              </Tooltip>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MesSimulateurs;
