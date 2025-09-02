import { type MutationTree }           from 'vuex';
import { type State, type User }       from './state';

/*
 * @Author: Jerryk jerry@icewhale.org
 * @Date: 2022-06-02 19:49:36
 * @LastEditors: zhanghengxin ezreal.ice@icloud.com
 * @LastEditTime: 2022-08-24 18:47:36
 * @FilePath: \CasaOS-UI\src\store\mutations.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

const mutations: MutationTree<State> = {
	// User and tokens
	SET_ACCESS_TOKEN(state, token: string) {
		state.access_token = token;
	},

	SET_REFRESH_TOKEN(state, token: string) {
		state.refresh_token = token;
	},

	SET_USER(state, user: User) {
		state.user = {
      ...user,
      is_admin: user.role === 'admin' ? true : false,
    };
	},

	SET_INIT_KEY(state, key: string) {
		state.initKey = key;
	},

	// Site
	SET_SITE_LOADING(state, loading: boolean) {
		state.siteLoading = loading;
	},

	SET_NEED_INITIALIZATION(state, need: boolean) {
		state.needInitialization = need;
	},

	SET_SIDEBAR_CLOSE(state) {
		state.sidebarOpen = false;
	},

	TOOGLE_SIDEBAR_STATE(state) {
		state.sidebarOpen = !state.sidebarOpen;
	},

	SET_WALLPAPER(state, wallpaper: any) {
		localStorage.setItem('wallpaper', wallpaper.path);
		state.wallpaperObject = wallpaper;
	},

	SET_IS_MOBILE(state, val: boolean) {
		state.isMobile = val;
	},

	SET_SEARCH_ENGINE(state, val: string) {
		state.searchEngine = val;
	},

	SET_SEARCH_ENGINE_SWITCH(state, val: boolean) {
		state.searchEngineSwitch = val;
	},

	// SET_EXISTING_APPS_SWITCH(state, val) {
	// 	state.existingAppsSwitch = val
	// },

	SET_TUTORIAL_SWITCH(state, val: string[]) {
		state.tutorialSwitch = val;
	},

	SET_RSS_SWITCH(state, val: boolean) {
		state.rssSwitch = val;
	},

	SET_HARDWARE_INFO(state, val: any) {
		state.hardwareInfo = val;
	},

	SET_CURRENT_PATH(state, val: string) {
		state.currentPath = val;
	},

	SET_IS_VIEW_GRID(state, val: boolean) {
		state.isViewGird = val;
	},

	SET_OPERATE_OBJECT(state, val: any) {
		state.operateObject = val;
	},

	SET_NETWORK_STORAGE(state, val: any) {
		localStorage.setItem('networkStorage', JSON.stringify(val));
		state.networkStorage = val;
	},

	// shortcut data mutations
	SET_SHORTCUT_DATA(state, val: any) {
		state.shortcutData = val;
	},
	GET_SHORTCUT_DATA(state) {
		return state.shortcutData;
	},

	// public params
	SET_DEVICE_ID(state, val: string) {
		state.device_id = val;
	},

	SET_ACCESS_ID(state, val: string) {
		state.access_id = val;
	},

	SET_LANGUAGE(state, val: string) {
		state.casaos_lang = val;
	},

	// TODO v2 does not have.
	SET_NOTIMPORT_LIST(state, val: any) {
		state.notImportList = val;
	},

	// New app IDs mutations
	SET_NEW_APP_IDS(state, val: string[]) {
		state.newAppIds = val;
	},

	ADD_NEW_APP_ID(state, appId: string) {
		if (state.newAppIds.indexOf(appId) === -1) {
			state.newAppIds.push(appId);
		}
	},

	REMOVE_NEW_APP_ID(state, appId: string) {
		const index = state.newAppIds.indexOf(appId);
		if (index !== -1) {
			state.newAppIds.splice(index, 1);
		}
	},

	SET_TIPS_STATE(state, val: string[]) {
		state.tipsState = val;
	},

	ADD_TIPS_STATE(state, val: string) {
		if (state.tipsState.indexOf(val) === -1) {
			state.tipsState.push(val);
		}
	},

	REMOVE_TIPS_STATE(state, val: string) {
		const index = state.tipsState.indexOf(val);
		if (index !== -1) {
			state.tipsState.splice(index, 1);
		}
	},
	SET_GPU_LIST(state, val: any) {
		state.gpuList = val;
	},
};

export default mutations;
