import React, {
  FunctionComponent,
  // useState,
  useEffect,
  useContext,
} from "react";
import { Context, IContext } from "../../../../Utils/context";
import { IProfileMenu } from "./props";
import { Popover, Button, Avatar } from "antd";
import * as FirebaseHelper from "../../../../Utils/FirebaseHelper";
import "./.css";
const ProfileMenu: FunctionComponent<IProfileMenu> = (props) => {
  const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {};
  }, []);

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
              <Button onClick={() => FirebaseHelper.LogOut()}>
                Se déconnecter
              </Button>
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
