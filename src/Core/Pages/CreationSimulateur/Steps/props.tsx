// tslint:disable-next-line:no-empty-interface
export interface IStepsContent {
  steps: Step[];
  nextStep: VoidFunction;
  previousStep: VoidFunction;
  currentStep: number;
}
export interface Step {
  title: string;
  content: JSX.Element;
}
