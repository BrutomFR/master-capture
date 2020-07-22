import React, { FunctionComponent, useState, useEffect } from "react";
import * as FirebaseHelper from "../../../Utils/FirebaseHelper";
import { ILogin } from "./props";
import "./.css";
import { Form, Input, Button, Checkbox } from "antd";
import { Store } from "antd/lib/form/interface";
import ImgLog from "../../../Img/logo-bruton-blanc-300x300.png";
import { UserOutlined } from "@ant-design/icons";

const Login: FunctionComponent<ILogin> = (props) => {
  // Variables pour les inputs
  const [nomDeCompte, setNomDeCompte] = useState<string>("");
  const [motDePasse, setMotDePasse] = useState<string>("");
  const [responseConnexion, setResponseConnexion] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const handleSetNomDeCompte = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNomDeCompte(event.target.value);
  const handleSetMotdePasse = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMotDePasse(event.target.value);
  const connect = () =>
    FirebaseHelper.SignIn(nomDeCompte, motDePasse).catch((error) =>
      setResponseConnexion(error.message)
    );

  useEffect(() => {
    return () => {};
  }, []);

  const onFinishFailed = (errorInfo: Store) =>
    console.log("Failed:", errorInfo);
  return (
    <div>
      <div>
        <div className="logo-brutom">
          <img width="100px" src={ImgLog} alt="brutom-logo" />
        </div>

        <div className="container-login">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={connect}
            onFinishFailed={onFinishFailed}
          >
            <Input
              placeholder="Email"
              prefix={
                <UserOutlined translate="" className="site-form-item-icon" />
              }
              onChange={handleSetNomDeCompte}
            />
            <Input.Password
              style={{ marginTop: "20px" }}
              placeholder="Mot de passe"
              prefix={
                <UserOutlined translate="" className="site-form-item-icon" />
              }
              onChange={handleSetMotdePasse}
            />

            <Form.Item
              style={{ marginTop: "10px" }}
              name="remember"
              valuePropName="checked"
              extra={responseConnexion}
            >
              <Checkbox>Se rappeler de moi</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={() => {
                  setLoadingButton(true);
                  setTimeout(() => setLoadingButton(false), 2000);
                }}
                loading={loadingButton}
                type="primary"
                htmlType="submit"
              >
                Se connecter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
