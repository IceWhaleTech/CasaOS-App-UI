<!--
 * @Author: Jerryk jerry@icewhale.org
 * @Date: 2022-03-01 21:10:57
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-09-20 11:20:02
 * @FilePath: /CasaOS-App-UI/src/components/Apps/AppPanel.vue
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.

-->
<template>
	<div
		:class="{
			narrow: currentSlide !== APP_STORE_PANEL,
			_stepStoreList: currentSlide === APP_STORE_PANEL,
			'pop-max': currentSlide === APP_STORE_PANEL,
			'pop-small': currentSlide === APP_INSTALLING_PANEL,
		}"
		class="app-card modal-card"
	>
		<template v-if="sidebarOpen">
			<!-- Sidebar Start -->
			<app-side-bar v-model="sidebarOpen" :overlay="true" :right="true" position="absolute">
				<template slot-scope="{ close }">
					<AppDetail
						:appDetailData="appDetailData"
						:arch="arch"
						:currentInstallId="currentInstallId"
						:handleBackBtnClick="close"
						:installedList="installedList"
						:showDetailSwiper="showDetailSwiper"
						:cateMenu="cateMenu"
						@install="quickInstall"
					>
					</AppDetail>
				</template>
			</app-side-bar>
			<!-- Sidebar End -->
		</template>
		<template v-else>
			<!-- Modal-Card Header Start -->
			<header :class="{ 'setting-compose-panel': currentSlide == APP_SETTING_PANEL && isCasa }" class="modal-card-head b-line">
				<div class="is-flex-grow-1">
					<h3 class="_title is-5">{{ panelTitle }}</h3>
				</div>
				<div class="is-flex is-align-items-center">
					<b-button
						v-if="currentSlide == APP_STORE_PANEL"
						:label="$t('Add a Containerized Application')"
						class="mr-2"
						icon-left="view-grid-plus"
						rounded
						size="is-small"
						type="is-primary"
						@click="currentSlide = APP_SETTING_PANEL"
					/>

					<b-tooltip v-if="showImportButton" :label="$t('Import')" position="is-bottom" type="is-dark">
						<button class="icon-button mdi mdi-import" type="button" @click="showImportPanel" />
					</b-tooltip>

					<b-tooltip
						v-if="showTerminalButton"
						:label="$t('Terminal & Logs')"
						position="is-bottom"
						type="is-dark"
					>
						<button class="icon-button mdi mdi-console" type="button" @click="showTerminalPanel" />
					</b-tooltip>

					<b-tooltip
						v-if="showExportButton"
						:label="$t('Export ComposeFile')"
						position="is-bottom"
						type="is-dark"
					>
						<button class="icon-button mdi mdi-export-variant" type="button" @click="exportYAML" />
					</b-tooltip>
					<div
						v-if="currentSlide !== APP_INSTALLING_PANEL"
						class="is-flex is-align-items-center modal-close-container modal-close-container-line"
					>
						<b-icon
							class="_polymorphic close"
							icon="close-outline"
							pack="casa"
							@click.native="$emit('close')"
						/>
					</div>
					<div v-else-if="currentSlide === APP_INSTALLING_PANEL" class="is-flex is-align-items-center">
						<b-icon
							class="_polymorphic close"
							icon="close-outline"
							pack="casa"
							@click.native="$emit('close')"
						/>
					</div>
				</div>
			</header>
			<!-- Modal-Card Header End -->

			<!-- Modal-Card Body Start -->
			<!-- App Store List Start -->
			<section
				v-if="currentSlide == APP_STORE_PANEL"
				:class="{ _hideOverflow: !isCasa }"
				class="modal-card-body pt-3 _pl app-store"
			>
				<template v-if="!isLoadError">
					<AppRecommend
						v-if="recommendList.length > 0"
						:arch="arch"
						:currentInstallId="currentInstallId"
						:installedList="installedList"
						:recommendList="recommendList"
						:showAppDetial="showAppDetial"
						:showDetailSwiper="showDetailSwiper"
						:quickInstall="quickInstall"
					>
					</AppRecommend>
					<!-- Featured Slider End -->

					<!-- List condition Start -->
					<AppConditionSelector
						:installedList="installedList"
						:isLoading="isLoading"
						:isMobile="isMobile"
						:pageList="pageList"
						@update-pageList="updatePageList"
						@update-isLoading="updateIsLoading"
						@update-isLoadError="updateIsLoadError"
						@update-installedList="updateInstalledList"
						@update-searchKey="updateSearchKey"
					/>
					<!-- List condition End -->

					<!-- App list Start-->
					<AppStoreContent 
						:filteredPageList="filteredPageList" 
						:installedList="installedList"
						:currentInstallId="currentInstallId"
						:arch="arch"
					></AppStoreContent>
					<!-- App list End-->
				</template>
				<template v-else>
					<div class="is-flex is-align-items-center is-justify-content-center mt-6 mb-6">
						<div class="has-text-centered mt-6 mb-6">
							<div class="is-flex is-align-items-center mb-5">
								<b-icon class="mr-2" icon="alert-circle" type="is-danger"></b-icon>
								{{ $t("There was an error loading the data, please try again!") }}
							</div>

							<b-button rounded type="is-primary" @click="retry()">Retry</b-button>
						</div>
					</div>
				</template>
			</section>
			<!-- App Store List End -->

			<!-- App Install Form Start -->
			<template v-if="currentSlide == APP_SETTING_PANEL">
				<!--:config-data="initConfigData"-->
				<ComposeConfig
					v-if="isCasa"
					ref="compose"
					:cap-array="capArray"
					:docker-compose-commands="dockerComposeConfig"
					:errInfo="errInfo"
					:networks="networks"
					:state="state"
					:total-memory="totalMemory"
					@updateDockerComposeCommands="updateDockerComposeCommands"
					@updateDockerComposeServiceName="updateDockerComposeServiceName"
					@updateMainName="(name) => (currentInstallId = name)"
				></ComposeConfig>

				<AppHost
					v-else 
					ref="apphost" 
					:isCasa="isCasa" 
					:appId="id" 
					:settingData="settingData"
				></AppHost>
			</template>
			<!-- App Install Form End -->

			<!-- App Install Process Start -->
			<section v-if="currentSlide == APP_INSTALLING_PANEL" class="app-installing">
				<AppInstallLoadingPanel
					:currentInstallAppText="currentInstallAppText"
					:currentInstallAppTextClass="currentInstallAppTextClass"
					:isCasa="isCasa"
					:totalPercentage="totalPercentage"
				/>
			</section>
			<!-- App Install Process End -->
			<b-loading v-model="isLoading" :can-cancel="false" :is-full-page="false"></b-loading>
			<!-- Modal-Card Body End -->

			<!-- Modal-Card Footer Start-->
			<AppInstallLoadingFooter
				v-if="currentSlide == APP_INSTALLING_PANEL"
				:currentInstallAppError="currentInstallAppError"
				:cancelButtonText="cancelButtonText"
				@close="$emit('close')"
				@back="prevStep"
			/>

			<AppSettingPanelFooter
				v-if="currentSlide == APP_SETTING_PANEL"
				:state="state"
				:isCasa="isCasa"
				:isLoading="isLoading"
				@install="checkComposeAppAndInstallComposeApp()"
				@update="updateApp()"
				@updateContainer="updateContainer()"
			/>
			<!-- Modal-Card Footer End -->
		</template>
	</div>
</template>

<script>
import AppSideBar from "./AppSideBar.vue";
import ImportPanel from "../forms/ImportPanel.vue";
import AppTerminalPanel from "./AppTerminalPanel.vue";
import "@/plugins/vee-validate";
import uniq from "lodash/uniq";
import orderBy from "lodash/orderBy";
import FileSaver from "file-saver";
import AppsInstallationLocation from "@/components/AppSetting/AppInstallationLocation.vue";
import business_ShowNewAppTag from "@/mixins/app/Business_ShowNewAppTag";
import business_OpenThirdApp from "@/mixins/app/Business_OpenThirdApp";
import ComposeConfig from "@/components/AppSetting/ComposeConfig.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { ice_i18n } from "@/mixins/base/common-i18n";
import { parse } from "yaml";
import { vOnClickOutside } from "@vueuse/components";
import { AppConditionSelector, AppDetail, AppRecommend, AppStoreContent } from "@/components/AppStore";
import { AppInstallLoadingFooter, AppInstallLoadingPanel } from "@/components/AppInstallLoadingPanel";
import { AppSettingPanelFooter } from "@/components/AppSetting";
import { AppHost } from "@/components/AppHost";

const data = [
	"AUDIT_CONTROL",
	"AUDIT_READ",
	"BLOCK_SUSPEND",
	"BPF",
	"CHECKPOINT_RESTORE",
	"DAC_READ_SEARCH",
	"IPC_LOCK",
	"IPC_OWNER",
	"LEASE",
	"LINUX_IMMUTABLE",
	"MAC_ADMIN",
	"MAC_OVERRIDE",
	"NET_ADMIN",
	"NET_BROADCAST",
	"PERFMON",
	"SYS_ADMIN",
	"SYS_BOOT",
	"SYS_MODULE",
	"SYS_NICE",
	"SYS_PACCT",
	"SYS_PTRACE",
	"SYS_RAWIO",
	"SYS_RESOURCE",
	"SYS_TIME",
	"SYS_TTY_CONFIG",
	"SYSLOG",
	"WAKE_ALARM",
];

/*
*  === 0 App Store Panel.
*  === 1 Setting Panel.	(Importing、Update Setting)
*  === 2 Other Panel. (Installing)
* */
const APP_STORE_PANEL = 0;
const APP_SETTING_PANEL = 1;
const APP_INSTALLING_PANEL = 2;

export default {
	components: {
		AppHost,
		AppSideBar,
		AppsInstallationLocation,
		ComposeConfig,
		ValidationObserver,
		ValidationProvider,
		AppDetail,
		AppRecommend,
		AppStoreContent,
		AppConditionSelector,
		AppInstallLoadingPanel,
		AppInstallLoadingFooter,
		AppSettingPanelFooter,
	},
	mixins: [business_ShowNewAppTag, business_OpenThirdApp],
	directives: {
		OnClickOutside: vOnClickOutside,
	},
	provide() {
		return {
			switchAppPanelToAppConfigContent: this.switchAppPanelToAppConfigContent,
			showAppDetial: this.showAppDetial,
			quickInstall: this.quickInstall,
		};
	},
	props: {
		id: String,
		state: String,
		storeId: {
			type: String,
			default: "",
		},
		isCasa: {
			type: Boolean,
			default: true,
		},
		runningStatus: String,
		configData: Object,
		// for import app. this.isCasa is false
		settingData: {
			type: Object,
		},
		// for compose app.
		settingComposeData: {
			type: String,
		},
	},

	data() {
		return {
			timer: 0,
			data: [],
			isLoading: true,
			isFetching: false,
			isLoadError: false,
			isFirst: true,
			errorType: 1,
			currentInstallAppName: null,
			currentInstallAppError: false,
			currentInstallAppType: null,
			currentInstallAppText: "",
			currentInstallAppProgress: {},
			currentInstallAppProgressTotals: {},

			sidebarOpen: false,
			cancelButtonText: "Cancel",
			totalMemory: 0,
			networks: [],
			tempNetworks: [],
			networkModes: [],
			// about @compose
			// Assign value to compose_config component
			dockerComposeConfig: "",
			capArray: data,
			errInfo: {},
			dockerComposeCommands: "",
			dockerComposeServiceName: "",

			pageIndex: 1,
			pageSize: 5,
			listTotal: 0,
			pageList: [],
			recommendList: {},
			currentSlide: 0,
			currentInstallId: "",

			// Featured Swiper
			searchKey: "",
			currentAuthor: { count: 0, font: "author", id: 0, name: "All" },
			cateMenu: [],
			storeQueryData: {
				index: 1,
				category: "All",
				authorType: "All",
				type: "rank",
				key: this.searchKey,
				pageSize: 5,
			},
			//  App Detail info
			appDetailData: {
				title: { en_us: "" },
				tagline: { en_us: "" },
				description: { en_us: "" },
			},
			arch: "",
			architectures: [],
			installationLocation: "",
			totalPercentage: 0,
			installedList: [],
			counterPatchGetStoreList: 0,
		};
	},

	created() {
		window.addEventListener("resize", this.setCSSVHVar);
		this.setCSSVHVar();

		//Get recommend
		this.getStoreRecommend();

		//Get Max memory info form device
		this.totalMemory = Math.floor(this.configData.memory.total / 1048576);

		//Handling network types
		this.tempNetworks = this.configData.networks;
		this.networkModes = uniq(
			this.tempNetworks.map((item) => {
				return item.driver;
			})
		);
		this.networks = this.networkModes.map((item) => {
			let tempitem = {};
			tempitem.driver = item;
			tempitem.networks = this.tempNetworks.filter((net) => {
				return net.driver == item;
			});
			return tempitem;
		});
		this.networks = orderBy(this.networks, ["driver"], ["asc"]);
		//If it is edit, Init data
		if (this.settingData != undefined || this.settingComposeData != undefined) {
			this.isLoading = false;
			this.dockerComposeConfig = this.settingComposeData;
			this.currentSlide = APP_SETTING_PANEL;
		} else {
			this.getCategoryList();
		}

		// If StoreId is not 0
		if (this.storeId != "") {
			this.$nextTick(() => {
				this.showAppDetial(this.storeId);
			});
		}

		// get architecture
		this.arch = localStorage.getItem("arch");
		if (!this.arch) {
			this.$api.sys.hardwareInfo().then((res) => {
				if (res.data.success == 200) {
					localStorage.setItem("arch", res.data.data.arch || "");
					this.arch = res.data.data.arch || "";
				}
			});
		}
	},
	computed: {
		showImportButton() {
			return this.currentSlide == APP_SETTING_PANEL && this.state == "install";
		},
		showExportButton() {
			return this.currentSlide == APP_SETTING_PANEL && this.state == "update";
		},
		showTerminalButton() {
			return this.currentSlide == APP_SETTING_PANEL && this.state == "update" && this.runningStatus == "running";
		},
		panelTitle() {
			if (this.currentSlide == APP_STORE_PANEL) {
				return this.$t("App Store");
			} else if (this.currentSlide == APP_SETTING_PANEL) {
				if (!this.isCasa) {
					return this.$t("Import") + " " + this.currentInstallId;
				} else {
					return this.settingData != undefined || this.settingComposeData != undefined
						? this.currentInstallId + " " + this.$t("Setting")
						: this.$t("Install a new App manually");
				}
			} else {
				return this.$t("Installing") + " " + this.currentInstallId;
			}
		},
		showDetailSwiper() {
			return !this.appDetailData.screenshot_link ? false : true;
		},
		currentInstallAppTextClass() {
			return this.currentInstallAppError ? "has-text-danger" : "has-text-black";
		},
		archTitle() {
			if (this.arch === "arm") {
				return "armv7";
			}
			return this.arch;
		},
		filteredPageList() {
			if (Object.keys(this.pageList).length === 0) return [];
			return this.pageList.filter((app) => {
				const keywords = (app.title + app.tagline)?.toLocaleLowerCase() ?? "";
				for (const term of this.searchKey.split(" ")) {
					if (keywords.indexOf(term.toLocaleLowerCase()) !== -1) {
						return true;
					}
				}
				return false;
			});
		},
		isMobile() {
			return this.$store.state.isMobile;
		},
	},
	watch: {
		// Watch if Section index changes
		currentSlide(val) {
			if (val == APP_SETTING_PANEL || val == APP_INSTALLING_PANEL) {
				this.isLoading = false;
			}
		},
	},
	methods: {
		updatePageList(val) {
			this.pageList = val;
		},
		updateIsLoading(val) {
			// TODO Too many callbacks function to isLoading errors.
			this.isLoading = val;
		},
		updateInstalledList(val) {
			this.installedList = val;
		},
		updateIsLoadError(val) {
			this.isLoadError = val;
		},
		updateSearchKey(val) {
			this.searchKey = val;
		},

		setCSSVHVar() {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		},

		/**
		 * @description: Get category list
		 * @param {*}
		 * @return {*} void
		 */
		async getCategoryList() {
			try {
				this.cateMenu = await this.$openAPI.appManagement.appStore.categoryList().then((res) =>
					res.data.data.filter((item) => {
						return item.count > 0;
					})
				);
			} catch (error) {
				console.error('getCategoryList', error);
			}
		},

		async getStoreRecommend() {
			try {
				// this.isLoading = true;

				let res = await this.$openAPI.appManagement.appStore
					.composeAppStoreInfoList(undefined, undefined, true)
					.then((res) => res.data.data.list);

				this.recommendList = Object.keys(res).map((id) => {
					let main_app_info = res[id];
					return {
						id,
						category: main_app_info.category,
						icon: main_app_info.icon,
						tagline: ice_i18n(main_app_info.tagline),
						thumbnail: main_app_info.thumbnail || main_app_info.screenshot_link?.[0],
						title: ice_i18n(main_app_info.title),
						state: 0,
						architectures: main_app_info.architectures,
					};
				});
			} catch (error) {
				console.log("load recommend error", error);
			}
		},

		/**
		 * @description: Show the details of app
		 * @param id
		 * @param id
		 */
		async showAppDetial(id) {
			this.isLoading = true;
			let { min_memory, compose } = await this.$openAPI.appManagement.appStore.composeApp(id).then((res) => {
				// A district that is reserved for resource.
				return {
					min_memory: res.data.data.compose.services[id]?.deploy?.resources?.reservations?.memory || "0",
					compose: res.data.data.compose,
				};
			});

			if (min_memory.includes("GB")) {
				min_memory = min_memory.replace("GB", "") * 1024;
			} else if (min_memory.includes("MB")) {
				min_memory = min_memory.replace("MB", "");
			} else {
				min_memory = min_memory / 1024 / 1024;
			}
			this.$openAPI.appManagement.appStore
				.composeAppStoreInfo(id)
				.then((res) => {
					this.sidebarOpen = true;
					this.appDetailData = res.data.data;
					this.appDetailData.id = id;
					this.appDetailData.min_memory = min_memory;
					this.appDetailData.compose = compose;
					this.architectures = res.data.data.architectures || [];
				})
				.catch((e) => {
					this.$buefy.toast.open({
						message: e.response.data.message,
						type: "is-danger",
					});
				})
				.finally(() => {
					this.isLoading = false;
				});
		},

		/**
		 * @description: Qucik Install App from app store
		 * @param id
		 * @param id
		 */
		quickInstall(id) {
			this.sidebarOpen = false;
			this.$openAPI.appManagement.appStore
				.composeApp(id, {
					headers: {
						"content-type": "application/yaml",
						accept: "application/yaml",
					},
				})
				.then((res) => {
					if (res.status == 200) {
						this.installComposeApp(res.data, id);
					} else {
						this.$buefy.toast.open({
							message: this.$t(`There was an error installing the application, please try again!`),
							type: "is-warning",
						});
					}
				})
				.catch((e) => {
					this.$buefy.toast.open({
						message: e.response.data.message,
						type: "is-danger",
					});
				});
		},
		/**
		 * @description: Get App icon form image
		 * @param {*} image
		 * @return {*}
		 */
		getIconFromImage(image) {
			if (image == "") {
				return "";
			} else {
				let appIcon = image.split(":")[0].split("/").pop();
				return `https://icon.casaos.io/main/all/${appIcon}.png`;
			}
		},
		/**
		 * @description: Back to prev Step
		 * @return {*} void
		 */
		prevStep() {
			this.currentSlide--;
		},

		/**
		 * @description: Validate form async
		 * @param {Object} ref ref of component
		 * @return {Boolean}
		 */
		async checkStep(ref) {
			return await ref.validate();
		},

		/**
		 * @description: Submit datas after valid
		 * @return {*} void
		 */
		checkComposeAppAndInstallComposeApp() {
			this.$refs.compose.checkStep().then((valid) => {
				if (valid.every((v) => v === true)) {
					this.installComposeApp(this.dockerComposeCommands, this.currentInstallId);
				} else {
					// toast info error.
					this.$buefy.toast.open({
						message: this.$t("Please confirm the input content."),
						duration: 5000,
						type: "is-danger",
					});
				}
			});
		},
		installComposeApp(dockerComposeCommands, appName) {
			return this.$openAPI.appManagement.compose
				.installComposeApp(dockerComposeCommands, false, true)
				.then((res) => {
					if (res.status === 200) {
					} else {
						this.dockerComposeConfig = dockerComposeCommands;
						this.currentSlide = APP_SETTING_PANEL;
						this.errInfo = res.data;

						this.$buefy.toast.open({
							message: this.$t("The information filled in needs to be corrected"),
							type: "is-warning",
						});
					}
				})
				.catch((e) => {
					if (e.response.status === 400) {
						this.dockerComposeConfig = dockerComposeCommands;
						this.currentSlide = APP_SETTING_PANEL;
						this.errInfo = e.response.data.data;
					}
					this.$buefy.toast.open({
						message: e.response.data || e.response.status,
						type: "is-danger",
					});
				});
		},

		/**
		 * @description: Save edit update
		 * @return {*} void
		 */
		updateApp() {
			this.$refs.compose.checkStep().then((valid) => {
				if (valid.every((v) => v === true)) {
					this.$openAPI.appManagement.compose
						.applyComposeAppSettings(this.id, this.dockerComposeCommands, false, true)
						.then((res) => {
							if (res.status == 200) {
								this.$emit("updateState");
							} else {
								this.errInfo = res.data;

								this.$buefy.toast.open({
									message: this.$t("The information filled in needs to be corrected"),
									duration: 10000,
									type: "is-warning",
								});
							}
							this.$emit("close");
						})
						.catch((err) => {
							if (err.response.status === 400) {
								console.log("Get ERROR:", err.response.data);
								this.errInfo = err.response.data;
							}
							this.$buefy.toast.open({
								message: err.response.data.message,
								duration: 5000,
								type: "is-warning",
							});
						});
				} else {
					this.$buefy.toast.open({
						message: this.$t("Please confirm the input content."),
						duration: 5000,
						type: "is-danger",
					});
				}
			});
		},

		async updateContainer() {
			this.isLoading = true;
			try {
				console.log(0);
				await this.$refs.apphost.updateAppHost();
				this.$emit("updateState");
				this.$emit("close");
				console.log(3);
			}catch (e) {
				this.$buefy
					.toast
					.open({
						message: err.response.data.message,
						type: "is-warning",
					});
			}
			this.isLoading = false;
			
		},

		/**
		 * @description: Show import panel
		 * @return {*} void
		 */
		showImportPanel() {
			this.$buefy.modal.open({
				parent: this,
				component: ImportPanel,
				hasModalCard: true,
				customClass: "",
				trapFocus: true,
				canCancel: ["escape"],
				scroll: "keep",
				animation: "zoom-in",
				events: {
					update: (e) => {
						this.dockerComposeConfig = e;
						this.$buefy.dialog.alert({
							title: "⚠️ " + this.$t("Attention"),
							message:
								'<div class="nobrk"><h4 class="title is-5">' +
								this.$t("AutoFill only helps you to complete most of the configuration.") +
								"</h4>" +
								'<p class="mb-3">' +
								this.$t("Some configuration information such as:") +
								"</p>" +
								"<ul>" +
								"<li>1. " +
								this.$t("the port and path of the Web UI") +
								"</li>" +
								"<li>2. " +
								this.$t("the mount location of the volume or file") +
								"</li>" +
								"<li>3. " +
								this.$t("the port mapping of the Host") +
								"</li>" +
								"<li>4. " +
								this.$t("optional configuration items") +
								"</li>" +
								"</ul>" +
								'<p class="mt-3">' +
								this.$t(
									"These include but are not limited to these cases and <b>still need to be confirmed or modified by you.</b>"
								) +
								"</p>" +
								'<p class="mt-3">' +
								this.$t("Feel free to suggest improvements to this feature in Discord Server!") +
								"</p></div>",
							type: "is-dark",
						});
					},
				},
				props: {
					netWorks: this.networks,
					oriNetWorks: this.tempNetworks,
					deviceMemory: this.totalMemory,
				},
			});
		},

		/**
		 * @description: Export AppData to json file
		 * @return {*} void
		 */
		exportYAML() {
			let title = parse(this.dockerComposeCommands)?.["x-casaos"]?.["title"];
			if (title) {
				title = ice_i18n(title);
			} else {
				title = this.currentInstallId;
			}
			const blob = new Blob([this.dockerComposeCommands], { type: "" });
			FileSaver.saveAs(blob, `${title}.yaml`);
		},
		/**
		 * @description: Show Terminal & Logs panel
		 * @return {*} void
		 */
		showTerminalPanel() {
			this.$openAPI.appManagement.compose
				.composeAppContainers(this.id)
				.then((res) => {
					if (res.status == 200) {
						const containers = res.data.data.containers;
						const main = res.data.data.main;
						const containerId = containers[this.dockerComposeServiceName].ID;
						this.$buefy.modal.open({
							parent: this,
							component: AppTerminalPanel,
							hasModalCard: true,
							customClass: "terminal-modal",
							trapFocus: true,
							canCancel: [],
							scroll: "keep",
							animation: "zoom-in",
							props: {
								appid: containerId,
								appName: this.currentInstallId,
								serviceName: this.dockerComposeServiceName,
							},
						});
					}
				})
				.catch((err) => {
					console.log("$openAPI.appManagement.compose.composeAppContainers", err.response);
				});
		},

		getSelection(val) {
			this.installationLocation = val;
		},

		installAppProgress(resData) {
			if (this.currentInstallAppName != resData.name) {
				return false;
			}

			if (!resData.finished) {
				this.currentInstallAppError = !resData.success;
				if (resData.success) {
					this.currentInstallAppType = resData.type;
					this.totalPercentage = Number(resData.progress);

					if (this.totalPercentage === 0) {
						this.currentInstallAppText = "Starting installation";
					} else if (this.totalPercentage === 100) {
						this.currentInstallAppText = "Installation completed";
					} else {
						this.currentInstallAppText = "Installing " + this.totalPercentage + "%";
					}
				} else {
					this.currentInstallAppText = resData.message;
				}
			} else {
				localStorage.removeItem("app_data");
				// business :: Tagging of new app / scrollIntoView
				setTimeout(() => {
					this.$emit("updateState");
					this.$emit("close");
				}, 500);
			}
		},

		updateDockerComposeCommands(val) {
			this.dockerComposeCommands = val;
		},

		updateDockerComposeServiceName(val) {
			this.dockerComposeServiceName = val;
		},

		switchAppPanelToAppConfigContent(composeCommands) {
			this.currentSlide = APP_SETTING_PANEL;
			this.sidebarOpen = false;
			this.dockerComposeConfig = composeCommands;
		},
	},

	destroyed() {
		window.addEventListener("resize", this.setCSSVHVar);
		clearInterval(this.timer);
	},

	sockets: {
		"app:install-begin"(res) {
			this.currentInstallAppName = res.Properties["app:name"];
			this.currentSlide = APP_INSTALLING_PANEL;
			this.currentInstallAppText = "Start Installation...";
			this.cancelButtonText = "Continue in background";
			this.installAppProgress({
				finished: false,
				name: res.Properties["app:name"],
				id: res.Properties["app:name"],
				success: true,
				type: "install-begin",
				message: "Start Installation...",
				progress: 0,
			});
		},
		"app:install-end"(res) {
			this.installAppProgress({
				finished: true,
				name: res.Properties["app:name"],
				id: res.Properties["docker:container:id"],
				process: 100,
			});
		},
		"app:install-error"(res) {
			this.installAppProgress({
				finished: false,
				name: res.Properties["app:name"],
				id: res.Properties["docker:container:id"],
				success: false,
				message: res.Properties["message"],
			});
		},
		"app:install-progress"(res) {
			this.installAppProgress({
				finished: false,
				name: res.Properties["app:name"],
				id: res.Properties["app:name"],
				success: true,
				type: "pull",
				progress: res.Properties["app:progress"],
				message: res.Properties["app:progress"],
			});
		},
	},
};
</script>

<style lang="scss">
// appPanel global style
.app-panel {
	._stepStoreList {
		min-height: calc(100vh - 2.5rem);

		.modal-card-body {
			overflow-y: scroll;
			overflow-x: clip;
		}
	}
}

.app-search {
	max-width: 12.5rem;
	width: 100%;

	.input {
		height: 2rem !important;
	}
}

.app-item {
	border-radius: 0.5rem;
	transition: background 0.3s ease;

	&:hover {
		background-color: hsl(0, 0%, 97%);
	}
}

.level-item {
	.icon {
		overflow: initial;
	}
}

.install-animation {
	width: 100px;
	height: 100px;
}

.creating-animation {
	width: 16rem;
	height: 16rem;
}

.app-select {
	.dropdown-menu {
		min-width: 1rem !important;
	}
}

.app-panel {
	.modal-card {
		&.pop-small {
			width: 424px;

			.app-installing {
				width: 424px;
			}
		}
	}
}

.animation-content {
	// 影响 External Link 宽度
	max-width: 100vw !important;
}

@media screen and (min-width: 769px) {
	.app-panel {
		.modal-card {
			transition: all 0.3s;

			._pl {
				margin-right: 0;
			}
		}
	}
}

@media screen and (min-width: 1440px) {
	.app-panel {
		.modal-card {

			._pl {
				margin-right: 0;
			}
		}
	}
}

@media screen and (max-width: 1366px) {
	.app-panel {
		.modal-card {
			width: 60rem;

			.app-store {
				width: 100%;
			}
		}
	}

	.f-list {
		.is-one-quarter {
			width: 33.333333% !important;
		}
	}
}

@media screen and (max-width: 1024px) {
	.app-panel {
		.modal-card {
			min-width: 100%;

			.app-store {
				width: 100%;
			}
		}
	}

	.f-list {
		.is-one-quarter {
			width: 50% !important;
		}
	}
}

@media screen and (max-width: 960px) {
	.modal .animation-content {
		width: 100%;
	}

	.app-panel {
		.modal-card {
			width: 100%;

			.app-store {
				width: 100%;
			}
		}
	}
}

@media screen and (max-width: 768px) {

}

@media screen and (max-width: 480px) {
	.app-panel {
		.modal-card {
			width: 100%;

			.app-store {
				width: 100%;
			}
		}
	}

	.f-list {
		.is-one-quarter {
			width: 100% !important;
		}
	}
}

.pri-line-height {
	line-height: 1.875rem;
}

.pri-message-alert {
	height: 2rem;
	margin-top: 0.5rem;
	margin-bottom: 1rem;
	background: #fff6e5;
	border-radius: 0.25rem;
	color: #d99000;
	font-size: 0.875rem;
	font-style: normal;
}

.is-overlay {
	overflow: overlay;
}

.card-width {
	max-width: 35rem;
	min-width: 30rem;
}
</style>
<style lang="scss" scoped>
.close {
	height: 2rem;
	width: 2rem;
	border-radius: 0.375rem;
}

.button[disabled] {
	opactiy: 0.3;
}

._title {
	font-family: "Roboto";
	font-style: normal;
	font-weight: 500;
	font-size: 1rem;
	line-height: 1.5rem;
	font-feature-settings: "pnum" on, "lnum" on;
	color: #29343d;
}

._hideOverflow {
	overflow: unset;
}

.progress {
	border-radius: 6px;
	height: 12px;

	&::-webkit-progress-bar {
		background: rgba(172, 184, 195, 0.4);
	}

	&::-webkit-progress-value {
		opacity: 1;
	}
}

// 0.4.4
._polymorphic:hover {
	cursor: pointer;
	background: hsla(208, 16%, 96%, 1);
}

._polymorphic:active {
	background: hsla(208, 16%, 94%, 1);
}

._polymorphic-attention:hover {
	cursor: pointer;
	background: hsla(18, 98%, 94%, 1);
}

._polymorphic-attention:active {
	background: hsla(18, 100%, 80%, 1);
}

._dropdown {
	height: 2rem;
	border-radius: 0.25rem;

	._dropdown__typeIcon {
		margin-left: 0.625rem;
		width: 18px;
		height: 18px;
	}

	._dropdown__stateIcon {
		margin-right: 0.625rem;
		width: 16px;
		height: 16px;
	}

	._dropdown__item {
		width: 112px;
		margin-right: 6px;
		margin-bottom: 2px;
	}
}
</style>