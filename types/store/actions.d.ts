declare const actions: {
    SET_SHORTCUT_DATA(context: {
        commit: (arg0: string, arg1: any) => void;
    }, val: any[]): Promise<void>;
    GET_SHORTCUT_DATA(context: {
        commit: (arg0: string, arg1: any) => void;
    }, val: any): Promise<void>;
};
export default actions;
