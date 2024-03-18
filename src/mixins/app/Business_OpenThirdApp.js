/*
 * @LastEditors: Jerryk jerry@icewhale.org
 * @LastEditTime: 2023-02-12 18:32:17
 * @FilePath: \CasaOS-UI-0.4.2\src\mixins\app\Business_OpenThirdApp.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

import { parse } from "yaml";

export default {
	methods: {
		openAppToNewWindow(appInfo) {
			this.hasNewTag(appInfo.name) ? this.firstOpenThirdApp(appInfo) : this.openThirdApp(appInfo, true);
		},
		openThirdApp(appInfo, isNewWindows) {
			this.$messageBus('apps_open', appInfo.name);
			if (appInfo.hostname !== "" || appInfo.port !== "" || appInfo.index !== "") {
				const hostIp = appInfo.hostname || this.$baseHostname
				const scheme = appInfo.scheme || 'http'
				const port = appInfo.port ? `:${appInfo.port}` : ''
				const url = `${scheme}://${hostIp}${port}${appInfo.index}`

				if (isNewWindows) {
					var arg = '\u003cscript\u003elocation.replace("' + url + '")\u003c/script\u003e';
					window.open('javascript:window.name;', arg);
				} else {
					let html = document.createElement('a');
					html.href = url;
					html.rel = 'noreferrer';
					document.getElementById('app').appendChild(html)
					setTimeout(() => {
						html.click();
					}, 500);
				}
			}
		},
		async openThirdContainerByAppInfo(appInfo) {
			try {
				let allinfo = await this.$openAPI.appManagement.compose.myComposeApp(appInfo.id).then(res => {
					return res.data.data
				})
				let containerInfoV2 = allinfo.store_info
				let app = {
					"id": appInfo.id,
					"name": appInfo.id,
					scheme: containerInfoV2.scheme,
					hostname: containerInfoV2.hostname || this.$baseHostname,
					port: containerInfoV2.port_map,
					index: containerInfoV2.index,
					image: allinfo.compose.services[appInfo.id].image,
				}
				this.openAppToNewWindow(app)
			} catch (e) {
				console.error(e);
			}

		},
		async firstOpenThirdApp(appInfo) {
			this.removeIdFromSessionStorage(appInfo.name);
			try {
				const composeSourceDataYAML = await this.$openAPI.appManagement.compose.myComposeApp(appInfo.name, {
					headers: {
						'content-type': 'application/yaml',
						'accept': 'application/yaml'
					}
				}).then(res => {
					return res.data
				})
				const composeSourceData = parse(composeSourceDataYAML);
				if (composeSourceData?.["x-casaos"]?.tips?.before_install?.en_us) {
					this.$buefy.modal.open({
						parent: this,
						component: () => import("@/components/AppSetting/AppTipModal.vue"),
						hasModalCard: true,
						customClass: '',
						trapFocus: true,
						canCancel: [''],
						scroll: "keep",
						animation: "zoom-in",
						events: {
							submit: () => {
								let routeUrl = this.$router.resolve({
									name: 'AppLauncherCheck',
									path: '/launch',
									query: {
										appDetailData: JSON.stringify(appInfo)
									}
								});
								window.open(routeUrl.href, '_blank');
							},
						},
						props: {
							composeData: composeSourceData
						}
					})
					return;
				}
			} catch (e) {
				console.error(e);
			}
			let routeUrl = this.$router.resolve({
				name: 'AppLauncherCheck',
				path: '/launch',
				query: {
					appDetailData: JSON.stringify(appInfo)
				}
			});
			window.open(routeUrl.href, '_blank');
		}
	}
}