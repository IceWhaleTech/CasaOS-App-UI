<template>
	<div class="columns f-list is-multiline is-mobile pb-3 mb-5">
		<div
			v-for="(item, index) in filteredPageList"
			:key="index + item.title + item.id"
			class="column app-item is-one-quarter"
		>
			<div class="is-flex is-align-items-center">
				<div class="mr-4 is-clickable" @click="showAppDetial(item.id)">
					<b-image
						:src="item.icon"
						:src-fallback="require('@/assets/img/app/default.svg')"
						class="is-64x64 icon-shadow app-icon"
						style="display: flex; align-items: center"
						webp-fallback=".jpg"
					></b-image>
				</div>
				<div
					class="is-flex-grow-1 mr-4 is-clickable"
					@click="
						showAppDetial(item.id);
						$messageBus('appstore_detail', item.title);
					"
				>
					<h6 class="title is-6 mb-2">{{ item.title }}</h6>
					<p class="is-size-7 two-line">{{ item.tagline }}</p>
				</div>
			</div>
			<div class="mt-1 ml-7 is-flex is-align-items-center">
				<div class="is-flex-grow-1 is-size-7 has-text-grey-light">
					{{ item.category }}
				</div>
				<b-button
					v-if="installedList.includes(item.id)"
					:loading="item.id == currentInstallId"
					rounded
					size="is-small"
					type="is-primary is-light"
					@click="openAppInStore(item)"
				>
					{{ $t("Open") }}
				</b-button>
				<b-button
					v-else
					:disabled="!item.architectures?.includes(arch)"
					:loading="item.id == currentInstallId"
					rounded
					size="is-small"
					type="is-primary is-light"
					@click="
						quickInstall(item.id);
						$messageBus('appstore_install', item.title);
					"
				>
					{{ $t("Install") }}
				</b-button>
			</div>
		</div>
	</div>
</template>
<script>
import business_OpenThirdApp from "@/mixins/app/Business_OpenThirdApp";
export default {
	mixins: [business_OpenThirdApp],
	inject: ["quickInstall", "showAppDetial"],
	props: {
		filteredPageList: Array,
		installedList: Array,
		currentInstallId: String,
		arch: String,
	},
};
</script>
