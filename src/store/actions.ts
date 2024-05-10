/*
 * @Author: Jerryk jerry@icewhale.org
 * @Date: 2022-06-02 19:50:08
 * @LastEditors: zhanghengxin ezreal.ice@icloud.com
 * @LastEditTime: 2022-08-30 16:16:32
 * @FilePath: /CasaOS-UI/src/store/actions.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

import $api from "@/service/api.js";

const actions = {
	// GET_HARDWARE_INFO(context, val) {
	//     context.commit("GET_HARDWARE_INFO",val)
	// },
	// set shortcut data
	async SET_SHORTCUT_DATA(context: { commit: (arg0: string, arg1: any) => void; }, val: any[]) {
		try {
			// Changing the shortcut data structure
			val.forEach((item: { icon: string; pack: string; visible: boolean; selected: boolean; extensions: null; }) => {
				item.icon = 'folder'
				item.pack = 'casa'
				item.visible = true
				item.selected = true
				item.extensions = null
			})
			let data = await $api.users.saveShutcutDetail(val).then((v: { data: { data: any; }; }) => v.data.data);
			context.commit("SET_SHORTCUT_DATA", data)
		} catch (e) {
			console.log(e)
		}
	},

	//get shortcut data
	async GET_SHORTCUT_DATA(context: { commit: (arg0: string, arg1: any) => void; }, val: any) {
		try {
			let data = await $api.users.getShutcutDetail(val).then((v: { data: { data: any; }; }) => v.data.data);
			if (!data) {
				data = []
			}
			context.commit("SET_SHORTCUT_DATA", data)
		} catch (e) {
			console.log(e)
		}
	}

}
export default actions
