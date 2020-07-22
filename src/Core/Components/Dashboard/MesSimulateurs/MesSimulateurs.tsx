import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import { Context, IContext } from "../../../../Utils/context";
import { IMesSimulateurs } from "./props";
import "./.css";
import { Switch, Col, Row, Button, Tooltip, Card } from "antd";
import CardSimulateur from "./CardSimulateur/CardSimulateur";
import RechartsSimulateur from "./RechartsSimulateur/RechartsSimulateur";
import { PlusOutlined } from "@ant-design/icons";

const MesSimulateurs: FunctionComponent<IMesSimulateurs> = (props) => {
  const monContext: IContext = useContext(Context);
  const [selectedSimulateur, setSelectedSimulateur] = useState<number>(-1);
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  useEffect(() => {
    selectedSimulateur != -1 ? setSwitchChecked(false) : setSwitchChecked(true);
    return () => {};
  }, [selectedSimulateur]);

  return (
    <div className="container-mes-simulateur">
      <div className="site-card-wrapper">
        <div className="container-card-simulateur">
          <Card
            title="Mes simulateurs:"
            bordered={true}
            className="container-card-simulateur"
          >
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
              }}
            >
              {monContext.User.get.pages_simulations.map((value, i) => (
                <Col key={i}>
                  <div onClick={() => setSelectedSimulateur(i)}>
                    <CardSimulateur simulateur={value} />
                  </div>
                </Col>
              ))}
            </Row>
            <div className="container-button-add-simulateur">
              <Tooltip title="Ajouter un simulateur">
                <Button
                  size="large"
                  shape="circle"
                  icon={<PlusOutlined translate="" />}
                />
              </Tooltip>
            </div>
          </Card>
        </div>
        <div className="container-card-simulateur">
          <Card title="Mes statistiques:" bordered={true}>
            <div className="header-statistiques">
              Tous les simulateurs:{" "}
              <Switch
                checked={switchChecked}
                onChange={(e) => (e ? setSelectedSimulateur(-1) : null)}
              />
            </div>
            <RechartsSimulateur selectedSimulateur={selectedSimulateur} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MesSimulateurs;
