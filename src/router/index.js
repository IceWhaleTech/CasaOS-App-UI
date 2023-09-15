/*
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-09-15 19:14:42
 * @FilePath: /CasaOS-App-UI/src/router/index.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

import Vue       from 'vue'
import VueRouter from 'vue-router'
import api       from '@/service/api'
import store     from '@/store'
import route     from './route.js'

Vue.use(VueRouter)

const routes = route

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

const originalPush = VueRouter.prototype.push

let externalMircoApp = '';

VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}

function checkUrlToken() {
	const searchParams = new URLSearchParams(window.location.search);
	const token = searchParams.get("token")
	externalMircoApp = searchParams.get("appName") || ''
	if (typeof token === 'string' && token !== '') {
		store.commit('SET_NEED_INITIALIZATION', false);
		localStorage.setItem("access_token", token);
	}
	searchParams.delete("token")
	searchParams.delete("appName")
	let newUrl = window.location.pathname;
	if (searchParams.toString()) {
		newUrl += "?" + searchParams.toString() + "/" + window.location.hash
	} else {
		newUrl += window.location.hash
	}
	// NOTICE: try to avoid page reload
	window.history.replaceState(null, '', newUrl);
}

router.beforeEach(async (to, from, next) => {

	const accessToken = localStorage.getItem("access_token");
	const version = localStorage.getItem("version");
	const requireAuth = to.matched.some(record => {
		return record.meta.requireAuth
	});

	if (!accessToken) {
		window.$wujie?.props.jump({ path: "/logout" });
		// next('/login')
	}else{
		next()
	}
})

// NOTICE: check only once when router inited
checkUrlToken();

export {externalMircoApp};
export default router;
