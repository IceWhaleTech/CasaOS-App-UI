export interface User {
    avatar: string;
    created_at: string;
    description: string;
    email: string;
    id: number;
    nickname: string;
    role: string;
    updated_at: string;
    username: string;
    is_admin?: boolean;
}
export interface State {
    access_token: string;
    refresh_token: string;
    user: User;
    initKey: string;
    sidebarOpen: boolean;
    searchEngine: string;
    searchEngineSwitch: boolean;
    tutorialSwitch: string[];
    rssSwitch: boolean;
    siteLoading: boolean;
    needInitialization: boolean;
    hardwareInfo: Record<string, unknown>;
    isMobile: boolean;
    operateObject: any;
    currentPath: string;
    isViewGird: boolean;
    wallpaperObject: {
        path: string | null;
        from: string;
    };
    networkStorage: any[];
    shortcutData: any[];
    device_id: string;
    access_id: string;
    casaos_lang: string;
    notImportList: any[];
    newAppIds: string[];
    tipsState: string[];
    gpuList: any[];
}
declare const state: {
    access_token: string;
    refresh_token: string;
    user: {
        avatar: string;
        created_at: string;
        description: string;
        email: string;
        id: number;
        nickname: string;
        role: string;
        updated_at: string;
        username: string;
    };
    initKey: string;
    sidebarOpen: boolean;
    searchEngine: string;
    searchEngineSwitch: boolean;
    tutorialSwitch: string[];
    rssSwitch: boolean;
    siteLoading: boolean;
    needInitialization: boolean;
    hardwareInfo: {};
    isMobile: boolean;
    operateObject: null;
    currentPath: string;
    isViewGird: boolean;
    wallpaperObject: {
        path: null;
        from: string;
    };
    networkStorage: any;
    shortcutData: never[];
    device_id: string;
    access_id: string;
    casaos_lang: string;
    notImportList: never[];
    newAppIds: never[];
    tipsState: never[];
    gpuList: never[];
};
export default state;
