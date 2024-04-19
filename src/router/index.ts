/*
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-09-18 19:02:15
 * @FilePath: /CasaOS-App-UI/src/router/index.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

import Vue       from 'vue'
import VueRouter from 'vue-router'
import route     from './route'

declare global {
	interface Window {
		$wujie?: {
			props: {
				jump: (options: { path: string }) => void;
			};
		};
	}
}

Vue.use(VueRouter)

const routes = route

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

// const originalPush = VueRouter.prototype.push


// VueRouter.prototype.push = function push(location) {
// 	return originalPush.call(this, location).catch((err) => err)
// }

router.beforeEach(async (to, from, next) => {

	const accessToken = localStorage.getItem("access_token");
	const version = localStorage.getItem("version");
	const requireAuth = to.matched.some(record => {
		return record.meta.requireAuth
	});

	if (!accessToken) {
		window.$wujie?.props.jump({ path: "/logout" });
	} else {
		next()
	}
})

export default router;
