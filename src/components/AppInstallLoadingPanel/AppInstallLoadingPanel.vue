<!--
 * @Author              : zhanghengxin ezreal.zhang@icewhale.org
 * @Date                : 2023-08-31 15:40:59
 * @LastEditTime        : 2023-10-09 15:56:48
 * @LastEditors         : zhanghengxin ezreal.zhang@icewhale.org
 * @FilePath            : /CasaOS-App-UI/src/components/AppInstallLoadingPanel/AppInstallLoadingPanel.vue
 * @Description         : Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
-->
<template>
<div :class="{'_hideOverflow': !isCasa}" class="modal-card-body pt-3 _b-line">
	<div class="installing-warpper mb-5">
		<div class="is-flex is-align-items-center is-justify-content-center">
			<lottie-animation :animationData="require('@/assets/ani/loading.json')" :autoPlay="true"
				:loop="true"
				class="install-animation mt-5 mb-2"></lottie-animation>
		</div>
		<b-progress
			:value="totalPercentage"
			format="percent"
			show-value type="is-primary"></b-progress>
		<h3 :class="currentInstallAppTextClass" class="title is-6 has-text-centered"
			style="height: 20px"
			v-html="currentInstallAppText"></h3>
	</div>
</div>
</template>

<script setup>
import LottieAnimation                          from "lottie-web-vue";

defineProps({
	isCasa: Boolean,
	totalPercentage: Number,
	currentInstallAppText: String,
	currentInstallAppTextClass: String,
})
</script>