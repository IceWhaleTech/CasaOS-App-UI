/*
 * @Author: Jerryk jerry@icewhale.org
 * @Date: 2022-06-02 19:48:26
 * @LastEditors: Jerryk jerry@icewhale.org
 * @LastEditTime: 2023-02-07 22:32:04
 * @FilePath: \CasaOS-UI-0.4.2\src\store\state.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

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
}

const state = {
	// User
	access_token: "",
	refresh_token: "",
	user: {
		avatar: "",
		created_at: "",
		description: "",
		email: "",
		id: 0,
		nickname: "",
		role: "",
		updated_at: "",
		username: ""
	},
	initKey: "", // Initialization key for reg

	sidebarOpen: false,

	// System Config
	searchEngine: '',
	searchEngineSwitch: true,
	// existingAppsSwitch: true,
	tutorialSwitch: ['Data station', 'Remote Access', 'File Manage'],
	rssSwitch: false,

	siteLoading: true,
	needInitialization: false,
	hardwareInfo: {},
	isMobile: false,

	// Files
	operateObject: null,
	currentPath: "",
	isViewGird: true,

	// Wallpaper
	wallpaperObject: {
		path: null,
		from: "Built-in" //Built-in, Upload, Files
	},

	// Samba and nfs data
	networkStorage: JSON.parse(localStorage.getItem('networkStorage') as string) || [],

	// shortcut data
	shortcutData: [],

	// public params
	device_id: "xxx",
	access_id: "dsdad",
	casaos_lang: "zh",
	notImportList: [],
}
export default state
