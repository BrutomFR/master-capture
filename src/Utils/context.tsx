import { createContext } from "react";
import { IUser } from "../Core/Interfaces/IUser";

export interface IContext {
  User: {
    get: IUser;
    set: React.Dispatch<React.SetStateAction<IUser>>;
  };
  Auth: {
    get: { uid: string };
    set: {};
  };
  SizeScreenUser: {
    get: number;
    set: React.Dispatch<React.SetStateAction<number>>;
  };
}

export const Context = createContext<IContext>({} as IContext);
