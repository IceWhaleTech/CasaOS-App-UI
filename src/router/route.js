/*
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-09-18 18:52:13
 * @FilePath: /CasaOS-App-UI/src/router/route.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

export default [
	{
		path: '/',
		name: 'Home',
		hidden: true,
		component: () => import('@/views/Home.vue'),
		meta: {
			requireAuth: true,
			showBackground: true
		}
	},
	{
		path: '/launch',
		name: 'AppLauncherCheck',
		hidden: true,
		component: () => import('@/views/AppLauncherCheck.vue'),
		meta: {
			requireAuth: false,
			showBackground: false
		}
	},
	{
		path: '/detection',
		name: 'AppDetection',
		hidden: true,
		component: () => import('@/views/AppDetection.vue'),
		meta: {
			requireAuth: false,
			showBackground: false
		}
	}
]