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
	<div :class="{ 'narrow': currentSlide > 0, '_stepStoreList': currentSlide === 0, 'pop-max': currentSlide === 0, 'pop-small': currentSlide === 2 }"
		class="app-card modal-card">
		<template v-if="sidebarOpen">
			<!-- Sidebar Start -->
			<app-side-bar v-model="sidebarOpen" :overlay="true" :right="true" position="absolute">
				<template slot-scope="{close}">
					<AppDetail :appDetailData="appDetailData" :arch="arch" :currentInstallId="currentInstallId"
						:handleBackBtnClick="close" :installedList="installedList" :showDetailSwiper="showDetailSwiper"
						:cateMenu="cateMenu" @install="quickInstall">
					</AppDetail>
				</template>
			</app-side-bar>
			<!-- Sidebar End -->
		</template>
		<template v-else>

			<!-- Modal-Card Header Start -->
			<header :class="{ 'setting-compose-panel': currentSlide == 1 && isCasa }" class="modal-card-head b-line">
				<div class="is-flex-grow-1">
					<h3 class="_title is-5">{{ panelTitle }}</h3>
				</div>
				<div class="is-flex is-align-items-center">
					<b-button v-if="currentSlide == 0" :label="$t('Add a Containerized Application')" class="mr-2"
						icon-left="view-grid-plus" rounded size="is-small" type="is-primary"
						@click="currentSlide = 1" />

					<b-tooltip v-if="showImportButton" :label="$t('Import')" position="is-bottom" type="is-dark">
						<button class="icon-button mdi mdi-import" type="button" @click="showImportPanel" />
					</b-tooltip>

					<b-tooltip v-if="showTerminalButton" :label="$t('Terminal & Logs')" position="is-bottom"
						type="is-dark">
						<button class="icon-button mdi mdi-console" type="button" @click="showTerminalPanel" />
					</b-tooltip>

					<b-tooltip v-if="showExportButton" :label="$t('Export ComposeFile')" position="is-bottom"
						type="is-dark">
						<button class="icon-button mdi mdi-export-variant" type="button" @click="exportYAML" />
					</b-tooltip>
					<div v-if="currentSlide < 2"
						class="is-flex is-align-items-center modal-close-container modal-close-container-line ">
						<b-icon class="_polymorphic close" icon="close-outline" pack="casa"
							@click.native="$emit('close')" />
					</div>
					<div v-else-if="currentSlide === 2" class="is-flex is-align-items-center">
						<b-icon class="_polymorphic close" icon="close-outline" pack="casa"
							@click.native="$emit('close')" />
					</div>
				</div>
			</header>
			<!-- Modal-Card Header End -->

			<!-- Modal-Card Body Start -->
			<!-- App Store List Start -->
			<section v-if="currentSlide == 0" :class="{ '_hideOverflow': !isCasa }"
				class="modal-card-body pt-3 _pl app-store">

				<template v-if="!isLoadError">

					<AppRecommend v-if="recommendList.length > 0" :arch="arch" :currentInstallId="currentInstallId"
						:installedList="installedList" :recommendList="recommendList" :showAppDetial="showAppDetial"
						:showDetailSwiper="showDetailSwiper" :quickInstall="quickInstall">
					</AppRecommend>
					<!-- Featured Slider End -->

					<!-- List condition Start -->
					<AppConditionSelector :installedList="installedList" :isLoading="isLoading" :isMobile="isMobile"
						:pageList="pageList" @update-pageList="updatePageList" @update-isLoading="updateIsLoading"
						@update-isLoadError="updateIsLoadError" @update-installedList="updateInstalledList"
						@update-searchKey="updateSearchKey" />

					<!-- List condition End -->
					<!-- App list Start-->
					<div class="columns f-list is-multiline is-mobile pb-3 mb-5">
						<div v-for="(item, index) in filteredPageList" :key="index + item.title + item.id"
							class="column app-item is-one-quarter">
							<div class="is-flex  is-align-items-center">
								<div class="mr-4 is-clickable" @click="showAppDetial(item.id)">
									<b-image :src="item.icon" :src-fallback="require('@/assets/img/app/default.svg')"
										class="is-64x64 icon-shadow" style="display: flex;align-items: center;"
										webp-fallback=".jpg"></b-image>
								</div>
								<div class="is-flex-grow-1 mr-4 is-clickable"
									@click="showAppDetial(item.id); $messageBus('appstore_detail', item.title)">
									<h6 class="title is-6 mb-2">{{ item.title }}</h6>
									<p class="is-size-7 two-line">{{ item.tagline }}</p>
								</div>

							</div>
							<div class="mt-1 ml-7 is-flex is-align-items-center">
								<div class="is-flex-grow-1 is-size-7 has-text-grey-light">
									{{ item.category }}
								</div>
								<b-button v-if="installedList.includes(item.id)" :loading="item.id == currentInstallId"
									rounded size="is-small" type="is-primary is-light"
									@click="openThirdContainerByAppInfo(item)">
									{{ $t('Open') }}
								</b-button>
								<b-button v-else :disabled="!item.architectures?.includes(arch)"
									:loading="item.id == currentInstallId" rounded size="is-small"
									type="is-primary is-light"
									@click="quickInstall(item.id); $messageBus('appstore_install', item.title)">
									{{ $t('Install') }}
								</b-button>

							</div>
						</div>
					</div>

					<!-- App list End-->
				</template>
				<template v-else>
					<div class="is-flex is-align-items-center is-justify-content-center mt-6 mb-6">
						<div class=" has-text-centered mt-6 mb-6">
							<div class="is-flex is-align-items-center mb-5">
								<b-icon class="mr-2" icon="alert-circle" type="is-danger"></b-icon>
								{{ $t('There was an error loading the data, please try again!') }}
							</div>

							<b-button rounded type="is-primary" @click="retry()">Retry</b-button>

						</div>

					</div>
				</template>

			</section>
			<!-- App Store List End -->

			<!-- App Install Form Start -->
			<template v-if="currentSlide == 1">
				<!--:config-data="initConfigData"-->
				<ComposeConfig v-if="isCasa" ref="compose" :cap-array="capArray"
					:docker-compose-commands="dockerComposeConfig" :errInfo="errInfo" :networks="networks"
					:state="state" :total-memory="totalMemory"
					@updateDockerComposeCommands="updateDockerComposeCommands"
					@updateDockerComposeServiceName="updateDockerComposeServiceName"
					@updateMainName="name => currentInstallId = name"
					@updateIsUncontrolledInstallParams="updateIsUncontrolledInstallParams"></ComposeConfig>

				<section v-else :class="{ '_hideOverflow': !isCasa }" class="modal-card-body pt-3">
					<!--	导入"已存在的容器"，进行初始化操作	-->
					<ValidationObserver ref="containerValida">
						<ValidationProvider v-slot="{ errors, valid }" name="appName" rules="required">
							<b-field :label="$t('App name') + ' *'" :message="$t(errors)"
								:type="{ 'is-danger': errors[0], 'is-success': valid }">
								<b-input v-model="settingData.label" :placeholder="$t('Your custom App Name')"
									maxlength="40"></b-input>
							</b-field>
						</ValidationProvider>

						<b-field :label="$t('Icon URL')">
							<p class="control">
								<span class="button is-static container-icon">
									<b-image :key="settingData.icon" :src="settingData.icon"
										:src-fallback="require('@/assets/img/app/default.svg')" class="is-32x32"
										ratio="1by1"></b-image>
								</span>
							</p>
							<b-input v-model="settingData.icon" :placeholder="$t('Your custom icon URL')"
								expanded></b-input>
						</b-field>

						<b-field label="Web UI">
							<b-select v-model="settingData.protocol">
								<option value="http">http://</option>
								<option value="https">https://</option>
							</b-select>
							<b-input v-model="settingData.host" :placeholder="this.$baseHostname" expanded></b-input>
							<b-autocomplete v-model="settingData.port_map" :data="(() => {
		return (settingData.ports || []).map((item) => {
			return item.host
		})
	})()" :open-on-focus="true" :placeholder="$t('Port')" class="has-colon" field="hostname"
								@select="option => (settingData.port_map = option)"></b-autocomplete>
							<b-input v-model="settingData.index" :placeholder="'/index.html ' + $t('[Optional]')"
								expanded></b-input>
						</b-field>
					</ValidationObserver>

				</section>
			</template>
			<!-- App Install Form End -->

			<!-- App Install Process Start -->
			<section v-if="currentSlide == 2" class="app-installing">
				<AppInstallLoadingPanel :currentInstallAppText="currentInstallAppText"
					:currentInstallAppTextClass="currentInstallAppTextClass" :isCasa="isCasa"
					:totalPercentage="totalPercentage" />
			</section>
			<!-- App Install Process End -->
			<b-loading v-model="isLoading" :can-cancel="false" :is-full-page="false"></b-loading>
			<!-- Modal-Card Body End -->


			<!-- Modal-Card Footer Start-->
			<AppInstallLoadingFooter v-if="currentSlide == 2" :currentInstallAppError="currentInstallAppError"
				:cancelButtonText="cancelButtonText" @close="$emit('close')" @back="prevStep" />

			<AppSettingPanelFooter v-if="currentSlide == 1" :state="state" :isCasa="isCasa" :isLoading="isLoading"
				@install="checkComposeAppAndInstallComposeApp()" @update="updateApp()" @updateContainer="updateContainer()" />
			<!-- Modal-Card Footer End -->
		</template>
	</div>
</template>

<script>
import AppSideBar from './AppSideBar.vue'
import ImportPanel from '../forms/ImportPanel.vue'
import AppTerminalPanel from './AppTerminalPanel.vue'
import "@/plugins/vee-validate";
import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import FileSaver from 'file-saver';
import AppsInstallationLocation from "@/components/AppSetting/AppInstallationLocation.vue";
import business_ShowNewAppTag from "@/mixins/app/Business_ShowNewAppTag";
import business_OpenThirdApp from "@/mixins/app/Business_OpenThirdApp";
// import DockerProgress from "@/components/AppInstallLoadingPanel/progress.js";
import ComposeConfig from "@/components/AppSetting/ComposeConfig.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { ice_i18n } from "@/mixins/base/common-i18n";
import { parse } from "yaml";
import { vOnClickOutside } from '@vueuse/components'
import { AppConditionSelector, AppDetail, AppRecommend } from "@/components/AppStore";
import { AppInstallLoadingFooter, AppInstallLoadingPanel } from "@/components/AppInstallLoadingPanel";
import { AppSettingPanelFooter } from "@/components/AppSetting";

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
	"WAKE_ALARM"
]

export default {
	components: {
		AppSideBar,
		AppsInstallationLocation,
		ComposeConfig,
		ValidationObserver,
		ValidationProvider,
		AppDetail, AppRecommend, AppConditionSelector,
		AppInstallLoadingPanel, AppInstallLoadingFooter,
		AppSettingPanelFooter
	},
	mixins: [business_ShowNewAppTag, business_OpenThirdApp],
	directives: {
		OnClickOutside: vOnClickOutside
	},
	provide() {
		return {
			switchAppPanelToAppConfigContent: this.switchAppPanelToAppConfigContent
		}
	},
	props: {
		id: String,
		state: String,
		storeId: {
			type: String,
			default: ""
		},
		isCasa: {
			type: Boolean,
			default: true
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
			// loadErrorStep: 0,
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
			dockerComposeConfig: '',
			capArray: data,
			errInfo: {},
			dockerComposeCommands: '',
			dockerComposeServiceName: '',

			pageIndex: 1,
			pageSize: 5,
			listTotal: 0,
			pageList: [],
			// communityList: {},
			recommendList: {},
			// Q: currentSlide 是什么功能？
			// A: currentSlide 是一个变量，用于控制页面的显示。0：显示应用商店列表；1：显示应用Setting 界面；2：显示应用安装进度界面。
			currentSlide: 0,
			currentInstallId: '',

			// Featured Swiper
			searchKey: "",
			currentAuthor: { count: 0, font: "author", id: 0, name: "All" },
			cateMenu: [],
			// currentSort: {},
			// sortMenu: [
			// 	{icon: "", slash: "rank", name: "Popular"},
			// 	{icon: "", slash: "new", name: "New"},
			// 	{icon: "", slash: "name", name: "Name"},
			// ],
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
				title: { en_us: "", },
				tagline: { en_us: "", },
				description: { en_us: "", },
			},
			arch: "",
			// unusable: false, // computer unusable
			architectures: [],

			// APPs Installation Location - requirement document
			// not be used.
			/*storageData: [{
				name: 12,
				isSystem: true,
				fsType: 'fsType',
				diskName: 'diakname',
				availSize: '1024',
				disk_type: 'type',
				path: 'path',
				mount_point: 'mount_point',
				usePercent: 20,
				model: 'model',
				size: 123,
				health: true,
				temperature: 100,
			}],*/
			/*storage_item_scence: 'select installation location',*/
			// isFirstInstall: false,
			installationLocation: '',
			// dockerProgress: null,
			totalPercentage: 0,
			installedList: [],
			counterPatchGetStoreList: 0,
			is_uncontrolled_install_params: false,
		}
	},

	created() {
		window.addEventListener('resize', this.setCSSVHVar);
		this.setCSSVHVar();

		//Get recommend
		this.getStoreRecommend();

		//Get Max memory info form device
		this.totalMemory = Math.floor(this.configData.memory.total / 1048576);

		//Handling network types
		this.tempNetworks = this.configData.networks;
		this.networkModes = uniq(this.tempNetworks.map(item => {
			return item.driver
		}))
		this.networks = this.networkModes.map(item => {
			let tempitem = {}
			tempitem.driver = item
			tempitem.networks = this.tempNetworks.filter(net => {
				return net.driver == item
			})
			return tempitem
		})
		this.networks = orderBy(this.networks, ['driver'], ['asc']);
		//If it is edit, Init data
		if (this.settingData != undefined || this.settingComposeData != undefined) {
			this.isLoading = false
			this.dockerComposeConfig = this.settingComposeData
			this.currentSlide = 1

		} else {
			this.getCategoryList();
		}

		// If StoreId is not 0
		if (this.storeId != "") {
			this.$nextTick(() => {
				this.showAppDetial(this.storeId);
			})
		}

		// 这是 选择应用安装位置。 这块功能不被使用，暂且保留。
		// close the function - APPs Installation Location
		// prepare data - APPs Installation Location requirement document
		// this.getDiskList();
		// close the function - APPs Installation Location
		// this.askInstallationLocation();

		// get architecture
		this.arch = localStorage.getItem('arch')
		if (!this.arch) {
			this.$api.sys.hardwareInfo().then(res => {
				if (res.data.success == 200) {
					localStorage.setItem('arch', res.data.data.arch || "")
					this.arch = res.data.data.arch || ""
				}
			})
		}
	},
	computed: {
		showImportButton() {
			return this.currentSlide == 1 && this.state == 'install'
		},
		showExportButton() {
			return this.currentSlide == 1 && this.state == 'update'

		},
		showTerminalButton() {
			return this.currentSlide == 1 && this.state == 'update' && this.runningStatus == 'running'
		},
		panelTitle() {
			if (this.currentSlide == 0) {
				return this.$t("App Store");
			} else if (this.currentSlide == 1) {
				if (!this.isCasa) {
					return this.$t("Import") + " " + this.currentInstallId
				} else {
					return (this.settingData != undefined || this.settingComposeData != undefined) ? this.currentInstallId + " " + this.$t("Setting") : this.$t("Install a new App manually")
				}

			} else {
				return this.$t("Installing") + " " + this.currentInstallId
			}
		},
		showDetailSwiper() {
			return (!this.appDetailData.screenshot_link) ? false : true;
		},
		currentInstallAppTextClass() {
			return this.currentInstallAppError ? 'has-text-danger' : 'has-text-black'
		},
		archTitle() {
			if (this.arch === 'arm') {
				return 'armv7'
			}
			return this.arch
		},
		filteredPageList() {
			if (Object.keys(this.pageList).length === 0) return [];
			return this.pageList.filter(app => {
				const keywords = (app.title + app.tagline)?.toLocaleLowerCase() ?? "";
				for (const term of this.searchKey.split(' ')) {
					if (keywords.indexOf(term.toLocaleLowerCase()) !== -1) {
						return true;
					}
				}
				return false;
			})
		},
		isMobile() {
			return this.$store.state.isMobile
		},

	},
	watch: {
		// Watch if Section index changes
		/*
		*  === 0 App Store Panel.
		*  === 1 Setting Panel.	(Importing、Update Setting)
		*  === 2 Other Panel. (Installing)
		* */
		currentSlide(val) {
			if (val == 1 || val == 2) {
				this.isLoading = false;
			}
		},
	},
	methods: {
		updatePageList(val) {
			this.pageList = val
		},
		updateIsLoading(val) {
			// TODO Too many callbacks function to isLoading errors.
			this.isLoading = val
		},
		updateInstalledList(val) {
			this.installedList = val
		},
		updateIsLoadError(val) {
			this.isLoadError = val
		},
		updateSearchKey(val) {
			this.searchKey = val
		},

		setCSSVHVar() {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		},

		/**
		 * @description: Get category list
		 * @param {*}
		 * @return {*} void
		 */
		async getCategoryList() {
			// this.isLoading = true
			try {
				this.cateMenu = await this.$openAPI.appManagement.appStore.categoryList().then(res => res.data.data.filter((item) => {
					return item.count > 0
				}));
				// this.currentCate = this.cateMenu[0]
				// this.currentSort = this.sortMenu[0]
				// if (this.isFirst) {
				// 	this.isFirst = false
				// }
			} catch (error) {
				// this.loadErrorStep = 1
				// this.isLoading = false;
				// this.isLoadError = true;
			}

		},

		async getStoreRecommend() {
			try {
				// this.isLoading = true;

				let res = await this.$openAPI.appManagement.appStore.composeAppStoreInfoList(undefined, undefined, true).then(res => res.data.data.list);

				this.recommendList = Object.keys(res).map(id => {
					let main_app_info = res[id]
					return {
						id,
						category: main_app_info.category,
						icon: main_app_info.icon,
						tagline: ice_i18n(main_app_info.tagline),
						thumbnail: main_app_info.thumbnail || main_app_info.screenshot_link?.[0],
						title: ice_i18n(main_app_info.title),
						state: 0,
						architectures: main_app_info.architectures,
						// scheme: main_app_info.apps[id].scheme,
						// port: main_app_info.apps[id].port_map,
						// index: main_app_info.apps[id].index,
					}
				})
			} catch (error) {
				console.log('load recommend error', error);
			}
		},

		/**
		 * @description: Show the details of app
		 * @param id
		 * @param id
		 */
		async showAppDetial(id) {
			this.isLoading = true;
			let { min_memory, compose } = await this.$openAPI.appManagement.appStore.composeApp(id).then(res => {
				// A district that is reserved for resource.
				return {
					min_memory: res.data.data.compose.services[id]?.deploy?.resources?.reservations?.memory || '0',
					compose: res.data.data.compose
				}
			})

			if (min_memory.includes('GB')) {
				min_memory = min_memory.replace('GB', '') * 1024
			} else if (min_memory.includes('MB')) {
				min_memory = min_memory.replace('MB', '')
			} else {
				min_memory = min_memory / 1024 / 1024
			}
			this.$openAPI.appManagement.appStore.composeAppStoreInfo(id).then(res => {
				this.sidebarOpen = true;
				this.appDetailData = res.data.data
				this.appDetailData.id = id
				this.appDetailData.min_memory = min_memory
				this.appDetailData.compose = compose
				this.architectures = res.data.data.architectures || [];
			}).catch((e) => {
				this.$buefy.toast.open({
					message: e.response.data.message,
					// message: this.$t(`There was an error loading the data, please try again!`),
					type: 'is-danger'
				})
			}).finally(() => {
				this.isLoading = false;
			})
		},

		retry() {
			// TODO the function will reImplement in next refactor
			// if (this.loadErrorStep === 1) {
			// 	this.getCategoryList()
			// } else if (this.loadErrorStep === 2) {
			// 	this.getStoreList()
			// }
		},


		/**
		 * @description: Qucik Install App from app store
		 * @param id
		 * @param id
		 */
		quickInstall(id) {
			this.sidebarOpen = false;
			this.$openAPI.appManagement.appStore.composeApp(id, {
				headers: {
					'content-type': 'application/yaml',
					'accept': 'application/yaml'
				}
			}).then(res => {
				if (res.status == 200) {
					this.installComposeApp(res.data, id)
				} else {
					this.$buefy.toast.open({
						message: this.$t(`There was an error installing the application, please try again!`),
						type: 'is-warning'
					})
				}
			}).catch((e) => {
				this.$buefy.toast.open({
					message: e.response.data.message,
					type: 'is-danger'
				})
			})
		},
		/**
		 * @description: Get App icon form image
		 * @param {*} image
		 * @return {*}
		 */
		getIconFromImage(image) {
			if (image == "") {
				return ""
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
			return await ref.validate()
		},

		/**
		 * @description: Submit datas after valid
		 * @return {*} void
		 */
		checkComposeAppAndInstallComposeApp() {
			this.$refs.compose.checkStep().then((valid) => {
				if (valid.every(v => v === true)) {
					this.installComposeApp(this.dockerComposeCommands, this.currentInstallId)
				} else {
					// toast info error.
					this.$buefy.toast.open({
						message: this.$t("Please confirm the input content."),
						duration: 5000,
						type: "is-danger"
					})
				}
			})
		},
		installComposeApp(dockerComposeCommands, appName) {
			return this.$openAPI.appManagement.compose.installComposeApp(dockerComposeCommands, false, true, this.is_uncontrolled_install_params).then(res => {
				if (res.status === 200) {
				} else {
					this.dockerComposeConfig = dockerComposeCommands;
					this.currentSlide = 1;
					this.errInfo = res.data

					this.$buefy.toast.open({
						message: this.$t('The information filled in needs to be corrected'),
						type: 'is-warning'
					})
				}
			}).catch((e) => {
				if (e.response.status === 400) {
					this.dockerComposeConfig = dockerComposeCommands;
					this.currentSlide = 1;
					this.errInfo = e.response.data.data
				}
				this.$buefy.toast.open({
					message: e.response.data || e.response.status,
					type: 'is-danger'
				})
			})
		},

		/**
		 * @description: Save edit update
		 * @return {*} void
		 */
		updateApp() {
			this.$refs.compose.checkStep().then((valid) => {
				if (valid.every(v => v === true)) {

					this.$openAPI.appManagement.compose.applyComposeAppSettings(this.id, this.dockerComposeCommands, false, true).then((res) => {
						if (res.status == 200) {
							this.$emit('updateState')
						} else {
							// this.dockerComposeConfig = dockerComposeCommands;
							// this.currentSlide = 1;
							this.errInfo = res.data

							this.$buefy.toast.open({
								message: this.$t('The information filled in needs to be corrected'),
								duration: 10000,
								type: 'is-warning'
							})
						}
						this.$emit('close')
					}).catch((err) => {
						if (err.response.status === 400) {
							console.log("Get ERROR:", err.response.data)
							this.errInfo = err.response.data
						}
						this.$buefy.toast.open({
							message: err.response.data.message,
							duration: 5000,
							type: 'is-warning'
						})
					})
				} else {
					// toast info error.
					this.$buefy.toast.open({
						message: this.$t("Please confirm the input content."),
						duration: 5000,
						type: "is-danger"
					})
				}
			})
		},

		updateContainer() {
			this.$refs.containerValida.validate().then((valid) => {
				if (valid) {
					this.isLoading = true;
					this.$api.container.update(this.id, this.settingData).then((res) => {
						if (res.data.success == 200) {
							this.$emit('updateState')
						} else {
							this.$buefy.toast.open({
								message: res.data.message.data,
								type: 'is-warning'
							})
						}
						this.$emit('close')
					}).catch((err) => {
						this.$buefy.toast.open({
							message: err.response.data.message,
							type: 'is-warning'
						})
					}).finally(() => {
						this.isLoading = false;
					})
				}
			})
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
				customClass: '',
				trapFocus: true,
				canCancel: ['escape'],
				scroll: "keep",
				animation: "zoom-in",
				events: {
					'update': (e) => {
						this.dockerComposeConfig = e;
						this.$buefy.dialog.alert({
							title: '⚠️ ' + this.$t('Attention'),
							message: '<div class="nobrk"><h4 class="title is-5">' + this.$t('AutoFill only helps you to complete most of the configuration.') + '</h4>' +
								'<p class="mb-3">' + this.$t('Some configuration information such as:') + '</p>' +
								'<ul>' +
								'<li>1. ' + this.$t('the port and path of the Web UI') + '</li>' +
								'<li>2. ' + this.$t('the mount location of the volume or file') + '</li>' +
								'<li>3. ' + this.$t('the port mapping of the Host') + '</li>' +
								'<li>4. ' + this.$t('optional configuration items') + '</li>' +
								'</ul>' +
								'<p class="mt-3">' + this.$t('These include but are not limited to these cases and <b>still need to be confirmed or modified by you.</b>') + '</p>' +
								'<p class="mt-3">' + this.$t('Feel free to suggest improvements to this feature in Discord Server!') + '</p></div>',
							type: 'is-dark'
						})
					}
				},
				props: {
					netWorks: this.networks,
					oriNetWorks: this.tempNetworks,
					deviceMemory: this.totalMemory
				}
			})
		},

		/**
		 * @description: Export AppData to json file
		 * @return {*} void
		 */
		exportYAML() {
			let title = YAML.parse(this.dockerComposeCommands)?.["x-casaos"]?.["title"]
			if (title) {
				title = ice_i18n(title)
			} else {
				title = this.currentInstallId
			}
			const blob = new Blob([this.dockerComposeCommands], { type: '' });
			FileSaver.saveAs(blob, `${title}.yaml`);
		},
		/**
		 * @description: Show Terminal & Logs panel
		 * @return {*} void
		 */
		showTerminalPanel() {
			this.$openAPI.appManagement.compose.composeAppContainers(this.id).then((res) => {
				if (res.status == 200) {
					const containers = res.data.data.containers;
					const main = res.data.data.main
					const containerId = containers[this.dockerComposeServiceName].ID;
					this.$buefy.modal.open({
						parent: this,
						component: AppTerminalPanel,
						hasModalCard: true,
						customClass: 'terminal-modal',
						trapFocus: true,
						canCancel: [],
						scroll: "keep",
						animation: "zoom-in",
						props: {
							appid: containerId,
							appName: this.currentInstallId,
							serviceName: this.dockerComposeServiceName,
						}
					})
				}
			}).catch((err) => {
				console.log('$openAPI.appManagement.compose.composeAppContainers', err.response)
			})
		},

		getSelection(val) {
			this.installationLocation = val
		},

		installAppProgress(resData) {
			if (this.currentInstallAppName != resData.name) {
				return false
			}

			if (!resData.finished) {
				this.currentInstallAppError = !resData.success;
				if (resData.success) {
					this.currentInstallAppType = resData.type;
					this.totalPercentage = Number(resData.progress);

					if (this.totalPercentage === 0) {
						this.currentInstallAppText = 'Starting installation'
					} else if (this.totalPercentage === 100) {
						this.currentInstallAppText = 'Installation completed'
					} else {
						this.currentInstallAppText = 'Installing ' + this.totalPercentage + '%'
					}
				} else {
					this.currentInstallAppText = resData.message
				}
			} else {
				localStorage.removeItem("app_data")
				// business :: Tagging of new app / scrollIntoView
				// this.addIdToSessionStorage(resData.name)

				setTimeout(() => {
					this.$emit('updateState')
					this.$emit('close')
				}, 500)
			}
		},

		updateDockerComposeCommands(val) {
			this.dockerComposeCommands = val
		},

		updateDockerComposeServiceName(val) {
			this.dockerComposeServiceName = val
		},

		updateIsUncontrolledInstallParams (is_uncontrolled_install_params) {
			this.is_uncontrolled_install_params = is_uncontrolled_install_params
		},

		switchAppPanelToAppConfigContent(composeCommands) {
			this.currentSlide = 1
			this.sidebarOpen = false
			this.dockerComposeConfig = composeCommands
		},
	},

	destroyed() {
		window.addEventListener('resize', this.setCSSVHVar);
		clearInterval(this.timer)
	},

	sockets: {
		"app:install-begin"(res) {
			this.currentInstallAppName = res.Properties["app:name"];
			this.currentSlide = 2;
			this.currentInstallAppText = "Start Installation..."
			this.cancelButtonText = 'Continue in background'
			// this.dockerProgress = new DockerProgress();
			this.installAppProgress({
				finished: false,
				name: res.Properties["app:name"],
				id: res.Properties["app:name"],
				success: true,
				type: "install-begin",
				message: "Start Installation...",
				progress: 0
			});
		},
		"app:install-end"(res) {
			this.installAppProgress({
				finished: true,
				name: res.Properties["app:name"],
				id: res.Properties["docker:container:id"],
				process: 100
			});
		},
		"app:install-error"(res) {
			this.installAppProgress({
				finished: false,
				name: res.Properties["app:name"],
				id: res.Properties["docker:container:id"],
				success: false,
				message: res.Properties["message"]
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
		// "docker:image:pull-progress"(res) {
		// 	this.installAppProgress({
		// 		finished: false,
		// 		name: res.Properties["app:name"],
		// 		id: res.Properties["docker:container:id"],
		// 		success: true,
		// 		type: "pull",
		// 		message: res.Properties["message"]
		// 	});
		// },
	}
}
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

		//width: 81.25rem;
		//.app-store{
		//	width: 81.25rem;
		//}
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
		// .animation-content {
		// 	max-width: 48rem !important;
		// }

		.modal-card {
			//width: 90vw;
			transition: all 0.3s;

			// &.narrow {
			// 	width: 50rem !important;
			// }

			._pl {
				margin-right: 0;
				//margin-left: calc(90vw - 100%);
			}
		}
	}
}

@media screen and (min-width: 1440px) {
	.app-panel {
		.modal-card {
			//width: 81rem !important;

			._pl {
				margin-right: 0;
				//margin-left: calc(81rem - 100%);
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

	// .modal-card{
	// 	max-height: calc(var(--vh, 1vh) * 100);
	// 	border-radius: 0;
	// 	._pl {
	// 		margin-right: 0;
	// 		margin-left: calc(100vw - 100%);
	// 	}
	// }
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
	// .modal-card {
	// 	max-height: calc(var(--vh, 1vh) * 100);
	// 	border-radius: 0;

	// 	._pl {
	// 		margin-right: 0;
	// 		margin-left: calc(100vw - 100%);
	// 	}
	// }
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
	//padding: 0.4rem 1rem;
	height: 2rem;
	//text-align: center;
	margin-top: 0.5rem;
	margin-bottom: 1rem;
	background: #FFF6E5;
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
	/* Text 500Medium/Text02 */

	font-family: 'Roboto';
	font-style: normal;
	font-weight: 500;
	font-size: 1rem;
	line-height: 1.5rem;
	/* identical to box height, or 150% */

	font-feature-settings: 'pnum' on, 'lnum' on;

	/* Gary/800 */

	color: #29343D;
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
