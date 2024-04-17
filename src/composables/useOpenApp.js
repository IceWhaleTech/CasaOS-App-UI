import messageBus       from '@/events/index.js'
import qs               from 'qs'
import { useOpenAPI }   from '@/service/index.js'
import { baseHostname } from '@/main.js'
const openAPI = useOpenAPI()

export const useOpenThirdApp = (appInfo, isNewWindows) => {
	return openThirdApp(appInfo, isNewWindows)
}
function openThirdApp(appInfo, isNewWindows) {
	messageBus('apps_open', appInfo.name);
	if (appInfo.hostname !== "" || appInfo.port !== "" || appInfo.index !== "") {
		const hostIp = appInfo.hostname
		const scheme = appInfo.scheme || 'http'
		const port = appInfo.port ? `:${appInfo.port}` : ''
		const url = `${scheme}://${hostIp}${port}${appInfo.index}`
		if (appInfo?.app_type === 'mircoApp') {
			window.location.href = `/modules/${item.name}`;
		}

		if (isNewWindows) {
			var arg = '\u003cscript\u003elocation.replace("' + url + '")\u003c/script\u003e';
			window.open('javascript:window.name;', arg);
		} else {
			let html = document.createElement('a');
			html.href = url;
			html.rel = 'noreferrer';
			document.getElementById('app').appendChild(html)
			html.click();
		}
	}
}

function openAppToNewWindow(appInfo) {
	appInfo.requireGPU ? firstOpenThirdApp(appInfo) : openThirdApp(appInfo, true);
}

function firstOpenThirdApp(appInfo) {
	window.location.href = `/modules/icewhale_app/#/launch?${qs.stringify(appInfo)}`
}

export const useOpenApp = () => {
	return (item) => {
		if (item.app_type === 'mircoApp') {
			if (item.open_type?.toLowerCase() === "newtab") {
				// item.requireGPU ? (window.location.href = `/modules/icewhale_app/#/launch?${qs.stringify(item)}`) : (window.location.href = `/modules/${item.name}`);
				window.location.href = `/modules/${item.name}`
			} else {
				messageBus('mircoapp_communicate', {
					action: MIRCO_APP_ACTION_ENUM.OPEN,
					name: item.name
				})
			}
		} else {
			openAppToNewWindow(item)
		}
	}
}

export const useOpenAppInStore = () => {
	return async (appInfoInStore) => {
		try {
			let allinfo = await openAPI.appManagement.compose.myComposeApp(appInfoInStore.id).then(res => {
				return res.data.data
			})
			let store_info = allinfo.store_info
			let app = {
				"id": appInfoInStore.id,
				"name": appInfoInStore.id,
				scheme: store_info.scheme,
				hostname: store_info.hostname || baseHostname,
				port: store_info.port_map,
				index: store_info.index,
				image: allinfo.compose.services[appInfoInStore.id].image,
				icon: store_info.icon,
			}
			if (allinfo.status.indexOf('running') === -1) {
				// TODO: started app in launch-page.
				await openAPI.appManagement.compose.setComposeAppStatus(allinfo.compose.name, 'start')
				window.open(`${window.location.href}launch?${qs.stringify(app)}`, '_blank')
			} else {
				openAppToNewWindow(app)
			}
		} catch (e) {
			console.error(e);
		}
	}
}