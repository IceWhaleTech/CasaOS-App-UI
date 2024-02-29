<template>
	<div class="hero is-fullheight has-background-black">
		<div class="hero-body is-flex is-flex-direction-column">
			<div
				class="container has-text-white is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
				<div class="is-flex is-align-items-center mb-3">
					<b-image :key="activeAppData.icon" :src="activeAppData.icon"
						:src-fallback="require('@/assets/img/app/default.svg')" class="is-64x64 icon-shadow"
						webp-fallback=".jpg"></b-image>

					<svg v-show="!isStoppingApp" width="24" height="24" viewBox="0 0 24 24" fill="none"
						xmlns="http://www.w3.org/2000/svg" class="mx-4">
						<path
							d="M0 12C0.0312502 14.1875 0.562495 16.1875 1.59375 18C2.65626 19.8125 4.12499 21.2812 6 22.4063C7.90626 23.4688 9.90624 24 12 24C14.0938 24 16.0937 23.4688 18 22.4063C19.875 21.2812 21.3437 19.8125 22.4063 18C23.4375 16.1875 23.9688 14.1875 24 12C23.9688 9.81249 23.4375 7.81251 22.4063 6C21.3437 4.18749 19.875 2.71876 18 1.59375C16.0937 0.531244 14.0938 0 12 0C9.90624 0 7.90626 0.531244 6 1.59375C4.12499 2.71876 2.65626 4.18749 1.59375 6C0.562495 7.81251 0.0312502 9.81249 0 12ZM11.2969 17.6719C10.7656 18.1094 10.2344 18.1094 9.70313 17.6719C9.26562 17.1406 9.26562 16.6094 9.70313 16.0781L13.7813 12L9.70313 7.92188C9.26562 7.39062 9.26562 6.85938 9.70313 6.32813C10.2344 5.89062 10.7656 5.89062 11.2969 6.32813L16.1719 11.2031C16.6094 11.7344 16.6094 12.2656 16.1719 12.7969L11.2969 17.6719Z"
							fill="#303233" />
					</svg>

					<b-image v-show="!isStoppingApp" :key="appDetailData.name" :src="appDetailData.icon"
						:src-fallback="require('@/assets/img/app/default.svg')" class="is-64x64 icon-shadow"
						webp-fallback=".jpg"></b-image>
				</div>
				<div class="has-text-full-02 mb-5">
					{{ appDetailData.name }}
				</div>
				<div class="has-text-full-02 mt-4 mb-2">
					{{
						isStoppingApp
						? $t(contentText, { name: activeAppData.name })
						: $t(contentText, {
							name: activeAppData.name,
						})
					}}
				</div>
				<div v-show="remakeText" class="has-text-full-04 op40 mb-5">
					{{ $t(remakeText) }}
				</div>
				<div v-show="remakeText && isFailed" class="has-text-info cursor-pointer"
					@click="closePage(appDetailData.name)">
					{{ $t("close") }}
				</div>
				<b-image v-if="isPending" :src="require('@/assets/img/loading/waiting.svg')" alt="pending"
					class="is-48x48 mt-6" />
				<div v-else-if="!isFailed" class="mt-4 is-flex is-justify-content-space-between">
					<b-button rounded class="has-text-white close-app-button mr-1" @click="closePage(appDetailData.name)">
						{{ $t("Continue {name}", { name: activeAppData.name }) }}
					</b-button>
					<b-button type="is-primary" rounded class="ml-1" @click="switchToApp(appDetailData.name)">
						{{ $t("Switch to {name}", { name: appDetailData.name }) }}
					</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router/composables";
import { usei18n } from "@/composables/usei18n";
import { useOpenApp } from "@/composables/useOpenApp";
import { iceGpu } from "@/service/index.js";
import { GPUApplicationStatusEnum } from "@icewhale/zimaos-openapi";

const openApp = useOpenApp();
const { i18n: t } = usei18n();
const route = useRoute();
const activeAppData = ref({ icon: "", name: "" });
const appDetailData = JSON.parse(route.query.appDetailData) || { icon: "", name: "" };
const isStoppingApp = ref(false);
const isStarttingApp = ref(false);
const contentText = ref("Insufficient performance to run simultaneously");
const remakeText = ref("Detected performance conflict");
const isFailed = ref(false);
const isPending = computed(() => isStoppingApp.value || isStarttingApp.value);

function closePage(appName) {
	// 关闭当前页面
	window.close();
}

async function stopApp() {
	isStoppingApp.value = true;
	contentText.value = "Closing {name}";
	remakeText.value = "";

	try {
		await iceGpu
			.setGPUApplicationsStatus(activeAppData.value.store_app_id, {
				status: GPUApplicationStatusEnum.Stop,
			})
			.then((res) => {
				if (res.status === 200) {
					isStoppingApp.value = false;
				}
			});
		return true;
	} catch(error) {
		console.error('close error', error);
		isStoppingApp.value = false;
		contentText.value = "Cannot close {name}";
		remakeText.value = "Please right-click on the dashboard and try closing it again";
		isFailed.value = true;
		return false;
	}
}

function startApp() {
	isStarttingApp.value = true;
	contentText.value = "Launching {name}";
	iceGpu
		.setGPUApplicationsStatus(appDetailData.name, {
			status: GPUApplicationStatusEnum.Start,
		})
		.then((res) => {
			if (res.status === 200) {
				isStarttingApp.value = false;
				openApp(appDetailData);
			}
		})
		.catch(() => {
			isStarttingApp.value = false;
			contentText.value = "Cannot launch {name}";
			remakeText.value = "Please right-click on the dashboard and try switching it again";
			isFailed.value = true;
		});
}

async function switchToApp(appName) {
	// first close the current app
	const result = await stopApp();
	if (!result) {
		return;
	}
	startApp();
}

onMounted(() => {
	iceGpu.getGPUApplications().then((res) => {
		const appList = res.data.data || [];
		// TODO: data model is not unified.
		const app = appList.find(
			(item) =>
				item.status === GPUApplicationStatusEnum.Running &&
				item.store_app_id !== appDetailData.name
		);

		if (app) {
			activeAppData.value = app;
		} else {
			startApp();
		}
	});
});
</script>
<style scoped>
.close-app-button {
	border: 0;
	outline: 0;
	background-color: rgba(48, 50, 51, 1);
}
</style>
