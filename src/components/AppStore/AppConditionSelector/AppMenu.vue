<template>
	<transition name="slide-fade">
		<div v-if="!activeAppStoreSourceInput || !isMobile"
			class="_polymorphic is-flex is-align-items-center _dropdown">
			<b-dropdown v-model="current" :max-height="240" :mobile-modal="false"
						animation="fade1" aria-role="list" class="app-select file-dropdown"
						position="is-bottom-right" scrollable>
				<template #trigger="{ active }">
					<div
						class="is-text auto-height pl-0 pt-0 pb-0 is-flex is-align-items-center">
						<b-icon class="mr-1 _dropdown__typeIcon" custom-size="mdi-18px"
								:icon="iconLogo"
								pack="casa"></b-icon>
						<span class="has-text-full-03">{{ current.name }}</span>
						<b-icon :icon="active ? 'chevron-up' : 'chevron-down'"
								class="ml-2 _dropdown__stateIcon"
								custom-size="casa-16px"></b-icon>
					</div>
				</template>
				<b-dropdown-item v-for="menu in menuData" :key="menu.id"
					:class="menu.id == menuData.id?'is-active':''"
					:data-title="menu.count"
					:value="menu" aria-role="listitem"
					class="_dropdown__item">
					<div class="media is-align-items-center is-flex has-text-full-03"
						@click="handleOptionClick(menu)">
						<div class="media-content">
							<h3>{{ menu.name }}</h3>
						</div>
					</div>
				</b-dropdown-item>
			</b-dropdown>

		</div>
	</transition>
</template>
<script setup>

const emit = defineEmits([
	'update-current',
])

const props = defineProps({
	activeAppStoreSourceInput: Boolean,
	isMobile: Boolean,
	current: Object,
	menuData: Array,
	handleOptionClickCallBack: Function,
	iconLogo: String,
});

const handleOptionClick = (menu) => {
	emit('update-current', menu)
	props.handleOptionClickCallBack(menu)
}
</script>

<style scoped>
.slide-fade-enter-active, .search-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active, search-fade-leave-active {
	transition: opacity 0s;
}

.search-fade-enter-from {
	transform: translateY(-20px);
	opacity: 0;
}

.slide-fade-enter-from {
	transform: translateX(20px);
	opacity: 0;
}
</style>