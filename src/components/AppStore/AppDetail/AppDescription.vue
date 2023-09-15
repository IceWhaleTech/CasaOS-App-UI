<!--
 * @Author: zhanghengxin ezreal.zhang@icewhale.org
 * @Date: 2023-08-31 15:40:59
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-09-15 11:05:07
 * @FilePath: /CasaOS-App-UI/src/components/AppStore/AppDetail/AppDescription.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
-->
<template>
	<div class="app-desc mt-4 mb-6">
		<VMdEditor
			:value="i18n(appDetailData.description)" mode="preview"
			left-toolbar right-toolbar>
		</VMdEditor>
		<!-- <p class="is-size-14px un-break-word">{{ i18n(appDetailData.description) }}</p> -->
	</div>
</template>

<script setup>
import VMdEditor   		from '@kangc/v-md-editor';
import { defineProps } 	from 'vue';
import { usei18n } 		from '@/composables/usei18n';

const { i18n } = usei18n();

const props = defineProps({
	appDetailData: {
		type: Object,
		default: () => {
		}
	}
});

defineExpose({
	i18n
})
</script>

<style scoped>
::v-deep .github-markdown-body{
	padding: 1rem 0 0 0;
	line-height: 1.25rem;
}
</style>