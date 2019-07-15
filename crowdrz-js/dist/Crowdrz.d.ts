declare const availableScope: string[];
declare const processList: any;
declare class Crowdrz {
    scope: string;
    key: string;
    constructor(scope: string, key: string);
    applyProcess(name: string, ressource: any): void;
}
