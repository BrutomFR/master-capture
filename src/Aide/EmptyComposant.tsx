import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import { Context, IContext } from "../Utils/context";
import { IEmptyComposant } from "./props";
import "./.css";
const EmptyComposant: FunctionComponent<IEmptyComposant> = (props) => {
  const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <div>Nouveau composant</div>
    </div>
  );
};

export default EmptyComposant;
