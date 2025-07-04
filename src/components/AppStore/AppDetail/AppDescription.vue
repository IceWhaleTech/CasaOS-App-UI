<template>
	<div class="mt-4 mb-6 app-desc">
		<VMdEditor
			:value="i18n(appDetailData.description)" mode="preview"
			left-toolbar right-toolbar>
		</VMdEditor>
	</div>
</template>

<script setup>
import VMdEditor   		from '@kangc/v-md-editor';
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
  font-family: "BrittiSans";
	padding: 1rem 0 0 0;
	line-height: 1.5em;
  font-size: 0.875rem;
}
</style>