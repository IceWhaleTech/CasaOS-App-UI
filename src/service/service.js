import axios  from 'axios'
import router from '@/router'
import store  from '@/store'
import { syncAppSocketToken } from '@/socket'

const axiosBaseURL = ``

//Create a axios instance, And set timeout to 30s
const instance = axios.create({
	baseURL: axiosBaseURL,
	timeout: 60000,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: false,
});

const getLangFromBrowser = () => {
	var lang = navigator.language || navigator.userLanguage;
	lang = lang.toLowerCase().replace("-", "_");
	return lang
}

const getInitLang = () => {
	let lang = localStorage.getItem('lang') || getLangFromBrowser()
	return lang
}


// Interception before request initiation
instance.interceptors.request.use(
	(config) => {
		config.headers.common["Language"] = getInitLang()
		const token = localStorage.getItem("access_token")
		const rtoken = localStorage.getItem("refresh_token")
		if (token) {
			config.headers.Authorization = token
			store.commit("SET_ACCESS_TOKEN", token);
			store.commit("SET_REFRESH_TOKEN", rtoken);
		}
		return config;
	}, (error) => {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Response interception

let refreshPromise = null
let refreshTimer = null
const TOKEN_REFRESH_BUFFER_MS = 60 * 1000

function logout() {
	router.replace({ //Jump to the logout page
		path: '/logout'
	})
}

function parseExpiresAt(expiresAt) {
	if (!expiresAt) {
		return null
	}

	if (typeof expiresAt === 'number') {
		return expiresAt > 1e12 ? expiresAt : expiresAt * 1000
	}

	const numericExpiresAt = Number(expiresAt)
	if (!Number.isNaN(numericExpiresAt) && numericExpiresAt > 0) {
		return numericExpiresAt > 1e12 ? numericExpiresAt : numericExpiresAt * 1000
	}

	const parsedExpiresAt = Date.parse(expiresAt)
	return Number.isNaN(parsedExpiresAt) ? null : parsedExpiresAt
}

function persistTokens(tokenData) {
	localStorage.setItem("access_token", tokenData.access_token);
	localStorage.setItem("refresh_token", tokenData.refresh_token);
	localStorage.setItem("expires_at", tokenData.expires_at);

	store.commit("SET_ACCESS_TOKEN", tokenData.access_token);
	store.commit("SET_REFRESH_TOKEN", tokenData.refresh_token);
	instance.defaults.headers.Authorization = tokenData.access_token
	syncAppSocketToken(tokenData.access_token)
	scheduleAccessTokenRefresh()

	return tokenData.access_token
}

export function scheduleAccessTokenRefresh() {
	if (typeof window === 'undefined') {
		return
	}

	if (refreshTimer) {
		window.clearTimeout(refreshTimer)
	}

	const expiresAt = parseExpiresAt(localStorage.getItem("expires_at"))
	if (!expiresAt) {
		return
	}

	const delay = Math.max(expiresAt - Date.now() - TOKEN_REFRESH_BUFFER_MS, 0)
	refreshTimer = window.setTimeout(() => {
		refreshAccessToken().catch((error) => {
			console.log(error);
		})
	}, delay)
}

export function refreshAccessToken() {
	if (refreshPromise) {
		return refreshPromise
	}

	const refresh_token = localStorage.getItem("refresh_token")
	if (!refresh_token) {
		logout()
		return Promise.reject(new Error("Missing refresh token"))
	}

	refreshPromise = instance.post("/v1/users/refresh", {
		refresh_token: refresh_token,
	}).then(tokenRes => {
		if (tokenRes.data.success == 200) {
			return persistTokens(tokenRes.data.data)
		}
		logout()
		throw new Error("Refresh token request failed")
	}).catch(error => {
		logout()
		throw error
	}).finally(() => {
		refreshPromise = null
	})

	return refreshPromise
}

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalConfig = error?.config;
		if (originalConfig.url !== "/users/register" && error?.response?.status === 401) {
			if (originalConfig.url === "/v1/users/refresh") {
				logout()
				return Promise.reject(error)
			}

			if (originalConfig._retry) {
				return Promise.reject(error)
			}

			originalConfig._retry = true

			try {
				const token = await refreshAccessToken()
				originalConfig.headers = {
					...(originalConfig.headers || {}),
					Authorization: token,
				}
				return instance(originalConfig)
			} catch (refreshError) {
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)

	}
)

const testVisionNum = (prefix) => {
	// default version number is /v1
	if (/^http/.test(prefix) || /^\/v[2-9]/.test(prefix)) {
		return prefix
	} else {
		return `/v1${prefix}`
	}
}

const CancelToken = axios.CancelToken;
// Wrapping of axios by request type
const api = {

	get(url, data, _this) {
		url = testVisionNum(url)
		if (_this) {
			return instance.get(url, {
				params: data,
				cancelToken: new CancelToken(function executor(c) {
					_this.cancelRequest = c
				})
			})
		} else {
			return instance.get(url, {
				params: data
			})
		}

	},
	post(url, data, config) {
		url = testVisionNum(url)
		return instance.post(url, data, config)
	},
	put(url, data) {
		url = testVisionNum(url)
		return instance.put(url, data)
	},
	delete(url, data) {
		url = testVisionNum(url)
		return instance.delete(url, {data: data})
	},
	patch(url, data) {
		url = testVisionNum(url)
		return instance.patch(url, data)
	},
}
export {api, instance}
