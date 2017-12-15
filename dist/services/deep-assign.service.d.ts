export declare class DeepAssignService {
    constructor();
    isObj: (x: any) => boolean;
    toObject: (val: any) => any;
    deepAssign: (target: any, ...args: any[]) => any;
    assign: (to: any, from: any) => any;
    assignKey: (to: any, from: any, key: any) => void;
}
