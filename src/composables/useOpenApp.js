import messageBus from '@/events/index.js'
import qs from 'qs'

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
	window.location.href = `/modules/icewhale_app/#/launch?${qs.stringify(appInfo )}`
}

export const useOpenApp = () => {
	
	return (item) => {
		debugger
		if (item.app_type === 'mircoApp') {
			if (item.open_type?.toLowerCase() === "newtab") {
				window.location.assign(`/modules/${item.name}`);
			} else {
				messageBus('mircoapp_communicate', {
					action: MIRCO_APP_ACTION_ENUM.OPEN,
					name: item.name
				})
			}
		}else{
			openAppToNewWindow(item)
		}
	}
}