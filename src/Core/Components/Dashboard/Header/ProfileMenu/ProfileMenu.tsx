import { Avatar, Button, Popover } from "antd";
import React, {
  FunctionComponent,
  // useState,
  useContext,
  useEffect,
} from "react";
import { Context, IContext } from "../../../../../Utils/context";
import * as FirebaseHelper from "../../../../../Utils/FirebaseHelper";
import "./.css";
import { IProfileMenu } from "./props";
const ProfileMenu: FunctionComponent<IProfileMenu> = (props) => {
  const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  const Logout = () => FirebaseHelper.LogOut();

  return (
    <div>
      <div>
        <Popover
          placement="bottom"
          title={"Options"}
          content={
            <div>
              <div>
                <div className="container-top-profil-menu">
                  <a href="#">
                    <h4>Mon profil</h4>
                  </a>
                </div>
                <div>
                  <a href="#">
                    <h4>RGPD</h4>
                  </a>
                </div>
              </div>
              <Button onClick={Logout}>Se déconnecter</Button>
            </div>
          }
          trigger="click"
        >
          <Avatar
            style={{
              backgroundColor: "#7265e6",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {monContext.User.get.Prenom}
          </Avatar>
        </Popover>
      </div>
    </div>
  );
};

export default ProfileMenu;
