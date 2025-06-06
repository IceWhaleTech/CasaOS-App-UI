import { parse }              from "yaml";
import business_ShowNewAppTag from "@/mixins/app/Business_ShowNewAppTag";

export default {
	mixins: [business_ShowNewAppTag],
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
					document.getElementById('app1').appendChild(html)
					setTimeout(() => {
						html.click();
					}, 500);
				}
			}
		},
		async openAppInStore(appInfo) {
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
					image: allinfo.compose.services[appInfo.id]?.image,
					icon: containerInfoV2.icon,
				}
				if (allinfo.status.indexOf('running') === -1) {
					await this.$openAPI.appManagement.compose.setComposeAppStatus(allinfo.compose.name, 'start')
					this.firstOpenThirdApp(app)
				}else{
					this.openAppToNewWindow(app)
				}
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
			this.checkAndOpenThirdApp(appInfo);
		},
		checkAndOpenThirdApp(appInfo) {
			this.removeIdFromSessionStorage(appInfo.name);
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