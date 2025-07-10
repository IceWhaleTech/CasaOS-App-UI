import { parse } from "yaml";
import business_ShowNewAppTag from "@/mixins/app/Business_ShowNewAppTag";
import { usei18n } from "@/composables/usei18n";

const { i18n } = usei18n();

// 常量定义
const DEFAULT_SCHEME = "http";
const WINDOW_OPEN_DELAY = 500;
const RUNNING_STATUS = "running";

export default {
	mixins: [business_ShowNewAppTag],

	methods: {
		/**
		 * 在新窗口中打开应用
		 * @param {Object} appInfo - 应用信息对象
		 */
		openAppToNewWindow(appInfo) {
			if (!appInfo?.name) {
				console.error("应用信息不完整，缺少name字段");
				return;
			}

			// 使用hasTips判断：如果需要显示提示(未被标记过)则检查modal提示，否则直接打开
			this.hasTips(appInfo.name) ? this.firstOpenThirdApp(appInfo) : this.openThirdApp(appInfo, true);
		},

		/**
		 * 打开第三方应用
		 * @param {Object} appInfo - 应用信息
		 * @param {boolean} isNewWindows - 是否在新窗口打开
		 */
		openThirdApp(appInfo, isNewWindows = false) {
			
			if (!appInfo) {
				console.error("应用信息不能为空");
				return;
			}

			// 发送消息总线事件
			// this.$messageBus("apps_open", appInfo.name);

			// 构建应用URL
			const url = this.buildAppUrl(appInfo);
			
			if (!url) {
				console.warn("无法构建应用URL，应用信息不完整");
				return;
			}

			if (isNewWindows) {
				this.openInNewWindow(url);
			} else {
				this.openInCurrentWindow(url);
			}
		},

		/**
		 * 构建应用访问URL
		 * @param {Object} appInfo - 应用信息
		 * @returns {string|null} 构建的URL或null
		 */
		buildAppUrl(appInfo) {
			const { hostname, port, index, scheme } = appInfo;

			// 检查必要的URL组件
			if (!hostname && !port && !index) {
				return null;
			}

			const hostIp = hostname || this.$baseHostname;
			const appScheme = scheme || DEFAULT_SCHEME;
			const portPart = port ? `:${port}` : "";
			const indexPart = index || "";

			return `${appScheme}://${hostIp}${portPart}${indexPart}`;
		},

		/**
		 * 在新窗口中打开URL
		 * @param {string} url - 要打开的URL
		 */
		openInNewWindow(url) {
			const script = `\u003cscript\u003elocation.replace("${url}")\u003c/script\u003e`;
			window.open("javascript:window.name;", script);
		},

		/**
		 * 在当前页面打开URL
		 * @param {string} url - 要打开的URL
		 */
		openInCurrentWindow(url) {
			// 直接在当前页面跳转
			window.location.href = url;
		},



		/**
		 * 从商店打开应用
		 * @param {Object} appInfo - 应用信息
		 */
		async openAppInStore(appInfo) {
			if (!appInfo?.id) {
				console.error("应用信息不完整，缺少id字段");
				return;
			}

			try {
				const allInfo = await this.getComposeAppInfo(appInfo.id);
				const app = this.buildAppFromStoreInfo(allInfo, appInfo.id);

				await this.handleAppStatus(allInfo, app);
			} catch (error) {
				console.error("打开商店应用失败:", error);
				this.$buefy.toast.open({
					message: "打开应用失败，请稍后重试",
					type: "is-danger",
				});
			}
		},

		/**
		 * 获取Compose应用信息
		 * @param {string} appId - 应用ID
		 * @returns {Promise<Object>} 应用信息
		 */
		async getComposeAppInfo(appId) {
			const response = await this.$openAPI.appManagement.compose.myComposeApp(appId);
			return response.data.data;
		},

		/**
		 * 从商店信息构建应用对象
		 * @param {Object} allInfo - 完整应用信息
		 * @param {string} appId - 应用ID
		 * @returns {Object} 构建的应用对象
		 */
		buildAppFromStoreInfo(allInfo, appId) {
			const { store_info: storeInfo, compose } = allInfo;

			return {
				id: appId,
				name: appId,
				scheme: storeInfo.scheme,
				hostname: storeInfo.hostname || this.$baseHostname,
				port: storeInfo.port_map,
				index: storeInfo.index,
				image: compose.services?.[appId]?.image,
				icon: storeInfo.icon,
			};
		},

		/**
		 * 处理应用状态并打开
		 * @param {Object} allInfo - 应用信息
		 * @param {Object} app - 构建的应用对象
		 */
		async handleAppStatus(allInfo, app) {
			const isRunning = allInfo.status.includes(RUNNING_STATUS);

			if (!isRunning) {
				await this.startComposeApp(allInfo.compose.name);
				this.firstOpenThirdApp(app);
			} else {
				this.openAppToNewWindow(app);
			}
		},

		/**
		 * 启动Compose应用
		 * @param {string} composeName - Compose名称
		 */
		async startComposeApp(composeName) {
			await this.$openAPI.appManagement.compose.setComposeAppStatus(composeName, "start");
		},

		/**
		 * 首次打开第三方应用（包含提示检查）
		 * @param {Object} appInfo - 应用信息
		 */
		async firstOpenThirdApp(appInfo) {
			if (!appInfo?.name) {
				console.error("应用信息不完整，缺少name字段");
				return;
			}

			// 移除新应用标记
			this.removeIdFromSessionStorage(appInfo.name);

			try {
				const composeData = await this.getComposeSourceData(appInfo.name);
				const hasModalTips = await this.checkAndShowTips(composeData, appInfo);
				if (!hasModalTips) {
					// 没有modal提示，直接打开应用
					this.openAppLauncher(appInfo);
				}
				// 如果有modal提示，在modal的submit回调中会处理后续逻辑
			} catch (error) {
				console.error("获取应用配置失败:", error);
				// 即使获取配置失败，也尝试打开应用
				this.checkAndOpenThirdApp(appInfo);
			}
		},

		/**
		 * 获取Compose源数据
		 * @param {string} appName - 应用名称
		 * @returns {Promise<Object>} 解析后的Compose数据
		 */
		async getComposeSourceData(appName) {
			const response = await this.$openAPI.appManagement.compose.myComposeApp(appName, {
				headers: {
					"content-type": "application/yaml",
					accept: "application/yaml",
				},
			});

			return parse(response.data);
		},

		/**
		 * 检查并显示安装前提示
		 * @param {Object} composeData - Compose数据
		 * @param {Object} appInfo - 应用信息
		 * @returns {Promise<boolean>} 是否显示了提示
		 */
		async checkAndShowTips(composeData, appInfo) {
			const tipsContent = composeData?.["x-casaos"]?.tips?.custom || composeData?.["x-casaos"]?.tips?.before_install;
			if (!tipsContent) {
				return false;
			}
			this.showTipModal(composeData, appInfo);
			return true;
		},

		/**
		 * 显示提示模态框
		 * @param {Object} composeData - Compose数据
		 * @param {Object} appInfo - 应用信息
		 */
		showTipModal(composeData, appInfo) {
			this.$buefy.modal.open({
				parent: this,
				component: () => import("@/components/AppSetting/AppTipModal.vue"),
				hasModalCard: true,
				customClass: "",
				trapFocus: true,
				canCancel: [""],
				scroll: "keep",
				animation: "zoom-in",
				events: {
					submit: () => {
						this.openAppLauncher(appInfo);
					},
				},
				props: {
					composeData,
					appInfo, // 传递应用信息给模态框
				},
			});
		},

		/**
		 * 打开应用启动器
		 * @param {Object} appInfo - 应用信息
		 */
		openAppLauncher(appInfo) {
			const routeUrl = this.$router.resolve({
				name: "AppLauncherCheck",
				path: "/launch",
				query: {
					appDetailData: JSON.stringify(appInfo),
				},
			});

			window.open(routeUrl.href, "_blank");
		},

		/**
		 * 检查并打开第三方应用
		 * @param {Object} appInfo - 应用信息
		 */
		checkAndOpenThirdApp(appInfo) {
			if (!appInfo?.name) {
				console.error("应用信息不完整，缺少name字段");
				return;
			}
			this.removeIdFromSessionStorage(appInfo.name);
			this.openAppLauncher(appInfo);
		},
	},
};
