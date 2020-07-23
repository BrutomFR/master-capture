import React, {
  FunctionComponent,
  useEffect,
  // useContext,
} from "react";
import "./.css";
// import { Context, IContext } from "../Utils/context";
import { IEmptyComposant } from "./props";
const EmptyComposant: FunctionComponent<IEmptyComposant> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <div>Nouveau composant</div>
    </div>
  );
};

export default EmptyComposant;
