import React, { FunctionComponent, useEffect } from "react";
import "./.css";
import { IPalierTarifs } from "./props";
const PalierTarifs: FunctionComponent<IPalierTarifs> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <div className="snip1404">
        {/*
        <div className="plan">
          <header>
            <h4 className="plan-title">Starter</h4>
            <div className="plan-cost">
              <span className="plan-price">$19</span>
              <span className="plan-type">/month</span>
            </div>
          </header>
          <ul className="plan-features">
            <li>
              <i className="ion-checkmark"> </i>5GB Linux Web Space
            </li>
            <li>
              <i className="ion-checkmark"> </i>5 MySQL Databases
            </li>
            <li>
              <i className="ion-checkmark"> </i>Unlimited Email
            </li>
            <li>
              <i className="ion-checkmark"> </i>250Gb mo Transfer
            </li>
            <li>
              <i className="ion-checkmark"> </i>24/7 Tech Support
            </li>
            <li>
              <i className="ion-checkmark"> </i>Daily Backups
            </li>
          </ul>
          <div className="plan-select">
            <a href="">Select Plan</a>
          </div>
        </div>
        <div className="plan">
          <header>
            <h4 className="plan-title">Basic</h4>
            <div className="plan-cost">
              <span className="plan-price">$29</span>
              <span className="plan-type">/month</span>
            </div>
          </header>
          <ul className="plan-features">
            <li>
              <i className="ion-checkmark"> </i>10GB Linux Web Space
            </li>
            <li>
              <i className="ion-checkmark"> </i>10 MySQL Databases
            </li>
            <li>
              <i className="ion-checkmark"> </i>Unlimited Email
            </li>
            <li>
              <i className="ion-checkmark"> </i>500Gb mo Transfer
            </li>
            <li>
              <i className="ion-checkmark"> </i>24/7 Tech Support
            </li>
            <li>
              <i className="ion-checkmark"> </i>Daily Backups
            </li>
          </ul>
          <div className="plan-select">
            <a href="">Select Plan</a>
          </div>
        </div>
        */}
        <div
          className="plan featured"
          style={{ backgroundColor: props.backgroundTarifsPlanColor }}
        >
          <header
            style={{ backgroundColor: props.backgroundTarifsHeaderColor }}
          >
            <h4 className="plan-title">Estimation de votre projet.</h4>
            <div className="plan-cost">
              <div style={{ textAlign: "center" }}>
                <div className="plan-price-month">Première mensualité</div>
                <span className="plan-price-one-shot">
                  449 {props.simulateurSelected.devise}
                </span>
              </div>
              <span>puis </span>
              <span className="plan-price-month">
                59 {props.simulateurSelected.devise}
              </span>
              <span className="plan-type">/mois</span>
            </div>
          </header>
          <ul className="plan-features">
            <li>
              <i className="ion-checkmark"> </i>Option 1
            </li>
            <li>
              <i className="ion-checkmark"> </i>Option 2
            </li>
            <li>
              <i className="ion-checkmark"> </i>Option 3
            </li>
            <li>
              <i className="ion-checkmark"> </i>Option 4
            </li>
            <li>
              <i className="ion-checkmark"> </i>Option 5
            </li>
            <li>
              <i className="ion-checkmark"> </i>....
            </li>
          </ul>
        </div>
        {/*<div className="plan">
          <header>
            <h4 className="plan-title">Ultra</h4>
            <div className="plan-cost">
              <span className="plan-price">$99</span>
              <span className="plan-type">/month</span>
            </div>
          </header>
          <ul className="plan-features">
            <li>
              <i className="ion-checkmark"> </i>100GB Linux Web Space
            </li>
            <li>
              <i className="ion-checkmark"> </i>Unlimited MySQL Databases
            </li>
            <li>
              <i className="ion-checkmark"> </i>Unlimited Email
            </li>
            <li>
              <i className="ion-checkmark"> </i>10000Gb mo Transfer
            </li>
            <li>
              <i className="ion-checkmark"> </i>24/7 Tech Support
            </li>
            <li>
              <i className="ion-checkmark"> </i>Daily Backups
            </li>
          </ul>
          <div className="plan-select">
            <a href="">Select Plan</a>
          </div>
      </div>*/}
      </div>
    </div>
  );
};

export default PalierTarifs;
