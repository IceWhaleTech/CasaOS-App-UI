<template>
	<div v-if="isCheckFailed"
		class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-fullheight">
		<b-image :key="appDetailData.icon" :src="appDetailData?.icon"
			:src-fallback="require('@/assets/img/app/default.svg')" class="is-64x64 icon-shadow"
			webp-fallback=".jpg"></b-image>
		<h2 class="mt-2 has-text-emphasis-01 has-text-white">{{ i18n(appDetailData.title) }}</h2>
		<h1 v-if="status === 'pending'" class="mt-5 has-text-sub-03 has-text-white">{{ $t('Starting up, please wait…') }}</h1>
		<h1 v-else class="mt-5 has-text-sub-03 has-text-white">{{ $t('Service Unavailable') }}</h1>
        <div v-if="status === 'pending'" class="flex flex-col justify-center items-center">
          <div class="mt-3 has-text-full-03 has-text-grey-600 max-w-[300px] text-center">
                {{ $t('Core service is ready, loading application data. Initial setup or large apps may take a few minutes.') }}
            </div>
            <b-image v-if="status === 'pending'" :src="require('@/assets/img/loading/waiting-white.svg')" alt="pending"
                class="mt-6 is-48x48" />
          </div>
          <div v-else class="flex flex-col justify-center items-center">
            <span class="mt-3 has-text-full-03 has-text-grey-600 max-w-[500px] text-center mx-4">
              {{ $t('The application is not running properly. We recommend checking:') }}
                <ul class="mt-3 list-disc list-inside text-left">
                  <li>{{ $t('All configuration items (e.g., port, path).') }}</li>
                  <li>{{ $t('The access permissions of the storage directories.') }}</li>
                  <li>{{ $t('The connection settings for dependent services like the database.') }}</li>
                </ul>
            </span>
            <span class="mx-4 mt-3 text-center text-white has-text-full-03">{{ $t('Please check the detailed startup logs in the "Configuration" menu to identify the specific issue.') }}</span>
        </div>
</div>
</template>

<script>
import business_OpenThirdApp from "@/mixins/app/Business_OpenThirdApp";
import ice_i18n              from "@/mixins/base/common-i18n";
import qs                    from "qs";

export default {
	name: "AppLauncherCheck",
	mixins: [business_OpenThirdApp, ice_i18n],
	data() {
		return {
			appDetailData: {
				icon: "",
				name: ""
			},
			status: "pending",
			timer: null,
			isCheckFailed: false,
			checkCounts: 6,
			counter: 0
		}
	},

	async created() {
		if (this.$route.query.appDetailData) {
			this.appDetailData = JSON.parse(this.$route.query.appDetailData)
		} else {
			this.appDetailData = qs.parse(window.location.hash.split("?")[1])
		}

		const startRes = await this.startContainer()
		this.timer && clearInterval(this.timer)
		this.timer = setInterval(this.check, 10000)
		this.check()
	},

	methods: {
		// Get container running state
		async getContainerState() {
			try {
				let res = await this.$api.container.getState(this.appDetailData.name)
				return res.data.data
			} catch (error) {
				return {
					state: "error"
				}
			}
		},
		// Start container
		async startContainer() {
			try {
				let res = await this.$openAPI.appManagement.compose.setComposeAppStatus(this.appDetailData.name, "start")
				return res.data
			} catch (error) {
				return "error"
			}
		},
		// Check container health
		async healthCheck() {
			try {
				let res = await this.$openAPI.appManagement.compose.checkComposeAppHealthByID(this.appDetailData.name)
				return res.status === 200
			} catch (error) {
				return false
			}
		},

		async check() {
			this.counter += 1
			const isOk = await this.healthCheck()
			if (isOk) {
				clearInterval(this.timer)
				this.openThirdApp(this.appDetailData)
			} else if (this.counter >= this.checkCounts) {
				this.status = "reject"
				clearInterval(this.timer)
			} else {
				this.isCheckFailed = true
			}
		},

		openApp (item) {
			if (item.app_type === 'mircoApp') {
				window.location.href = `/modules/${item.name}`;
			} else {
				this.openThirdApp(item)
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.is-fullheight {
	background: hsla(208, 20%, 12%, 1);
	height: 100vh;
}
</style>