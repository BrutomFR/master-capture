// tslint:disable-next-line:no-empty-interface
export interface IFooterCreationSimulateur {
    currentStep: number
    steps: {
        title: string;
        content: JSX.Element;
    }[];
}
