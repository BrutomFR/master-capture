// tslint:disable-next-line:no-empty-interface
export interface IBodyCreationSimulateur {
  steps: Step[];
  nextStep: VoidFunction;
  previousStep: VoidFunction;
  currentStep: number;
  simulateurId?: number;
}
export interface Step {
  title: string;
  content: JSX.Element;
}
