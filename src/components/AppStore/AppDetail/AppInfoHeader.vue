<template>
	<div class="app-header is-flex pb-4">
		<div class="header-icon mr-5">
			<b-image
				:key="appDetailData.icon"
				:src="appDetailData.icon"
				:src-fallback="require('@/assets/img/app/default.svg')"
				class="is-128x128 icon-shadow"
				webp-fallback=".jpg"
			>
			</b-image>
		</div>

		<div class="is-flex-grow-1 is-flex is-align-items-center">
			<div>
				<h4 class="title store-title is-4">{{ i18n(appDetailData.title) }}</h4>
				<p class="subtitle is-size-14px two-line mb-3">{{ i18n(appDetailData.tagline) }}</p>
				<p class="description mb-2">
					<b-button
						v-if="installedList.includes(appDetailData.id)"
						:loading="appDetailData.id == currentInstallId"
						rounded
						size="is-normal"
						type="is-primary"
						@click="openThirdAppInStore(appDetailData)"
					>
						{{ $t('Open') }}
					</b-button>
					<b-button
						v-else
						class="p-0 custom-install-button"
						:disabled="unusable"
						:loading="appDetailData.id == currentInstallId"
						rounded
						size="is-normal"
						type="is-primary"
					>
						<div
							@click.self="
								$emit('install', appDetailData.id, appDetailData)
								$messageBus('appstore_install', i18n(appDetailData.title))
							"
							class="custom-install-button-content"
						>
							{{ $t('Install') }}
						</div>
						<b-dropdown :triggers="['hover', 'click']" @click.stop>
							<template #trigger>
								<div class="casa-down-outline custom-install-dropdown-trigger"></div>
							</template>
							<b-button
								:disabled="unusable"
								:loading="appDetailData.id == currentInstallId"
								rounded
								size="is-normal"
								type="is-primary"
								@click="openConfigPanle"
							>
								{{ $t('Custom Install') }}
							</b-button>
						</b-dropdown>
					</b-button>
				</p>

				<p
					v-if="unusable"
					class="has-background-red-tertiary has-text-red has-text-full-04 _is-normal is-flex is-align-items-center font pr-2"
					style="width: fit-content; height: 1.5rem; border-radius: 0.25rem"
				>
					<label class="is-flex ml-2 mr-1">
						<b-icon class="is-16x16" custom-size="casa-19px" icon="close" pack="casa"></b-icon>
					</label>
					{{ $t('Not compatible with {arch} devices.', { arch: archTitle }) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineExpose, defineEmits, inject } from 'vue'
import { usei18n }                                        from '@/composables/usei18n'
import messageBus                                         from '@/events'
import YAML                                               from 'yaml'
import { useOpenThirdAppInStore }                         from '@/composables/useOpenApp'

const switchAppPanelToAppConfigContent = inject('switchAppPanelToAppConfigContent')
const openThirdAppInStore = useOpenThirdAppInStore()
const props = defineProps({
	appDetailData: {
		type: Object,
		default: () => {}
	},
	installedList: {
		type: Array,
		default: () => {}
	},
	unusable: {
		type: Boolean,
		default: false
	},
	currentInstallId: {
		type: String,
		default: ''
	},
	archTitle: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['install'])

const { i18n } = usei18n()

const handleInstallBtnClick = () => {
	emit('install')
	messageBus('appstore_install', i18n(props.appDetailData.title))
}

function openConfigPanle () {
	// this.$emit('switchAppPanelToAppConfigContent', YAML.stringify(this.appDetailData.compose))
	console.log('openConfigPanle', props.appDetailData)
	switchAppPanelToAppConfigContent(YAML.stringify(props.appDetailData.compose))
}

defineExpose({
	i18n
})
</script>

<style scoped>
.app-header {
	position: relative;
}

::v-deep .dropdown-content {
	box-shadow: none;
	padding: 0;
}

@media screen and (max-width: 480px) {
	.app-header {
		position: relative;

		.header-icon {
			.is-128x128 {
				height: 96px;
				width: 96px;
			}
		}

		.store-title {
			font-size: 1.125rem;
		}

		.subtitle {
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
		}

		.description {
			.button {
				font-size: 0.75rem;
			}
		}
	}
}

.custom-install-dropdown-trigger {
	width: 3rem;
	height: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
<style>
/* // version dropdown css */
.dropdown.is-hoverable:hover .dropdown-menu {
	display: block;
}

.dropdown-menu,
.dropdown-content {
	box-shadow: none;
}

.dropdown-content .button {
	display: flex;
}
.custom-install-button {
	span {
		display: flex;
		.custom-install-button-content {
			display: flex;
			flex-shrink: 0;
			padding-left: 1.25rem;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
		}
		.custom-install-dropdown-trigger {
			width: 3rem;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
