<template>
	<div id="app1" class="font-sans">
		<!-- Router View Start -->
		<router-view/>
		<!-- Router View End -->
	</div>
</template>

<script>
import {mixin}              from './mixins/mixin';
import {ConfigProgrammatic} from 'buefy/src/index.js'

const customIconConfig = {
	customIconPacks: {
		'casa': {
			sizes: {
				'default': 'is-size-4',
				'is-20': 'is-size-5',
				'is-small': '',
				'is-medium': 'is-size-3',
				'is-large': 'is-size-1'
			},
			iconPrefix: 'casa-',
			internalIcons: {
				'check': 'checkmark',
				'information': 'information',
				'check-circle': 'checkmark-circle-outline',
				'alert': 'alert',
				'alert-circle': 'alert',
				'arrow-up': 'arrow-up',
				'chevron-right': 'arrow-right',
				'chevron-left': 'arrow-back',
				'chevron-down': 'arrow-down',
				'eye': 'eye',
				'eye-off': 'eye-off',
				'menu-down': 'arrow-dropdown',
				'menu-up': 'arrow-dropup',
				'close-circle': 'close-circle-outline'
			}
		},
	}
}

export default {
	mixins: [mixin],
	data() {
		return {
		}
	},
	computed: {
	},
	provide() {
		return {
		}
	},
	watch: {
	},
	beforeCreate() {
	},
	created() {
		// this.$buefy.config.setOptions(customIconConfig)
		ConfigProgrammatic.setOptions(customIconConfig);
	},
	mounted() {
		this.setInitLang();
		window.addEventListener('resize', this.onWindowResize);
		this.onWindowResize();
	},
	methods: {
		/**
		 * @description: Get and Set default language
		 * @return {*} void
		 */
		setInitLang() {
			let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : this.getLangFromBrowser()
			lang = lang.includes("_") ? lang : "en_us";
      lang = lang.toLowerCase();
			this.setLang(lang)
		},
		/**
		 * @description: Handle on Window reize
		 * @return {*}
		 */
		onWindowResize() {
			const isMobile = document.body.clientWidth < 480
			this.$store.commit('SET_IS_MOBILE', isMobile)
		},
	},
	sockets: {
		connect() {
			console.log('socket connected');
		},
		"casaos-ui:topbar:dashboardsetting_language"(res) {
      const lang = res.Properties.casaos_lang.toLowerCase();
			this.setLang(lang)
		},
	},
}
</script>

<style lang="scss" scoped>
#app1 {
	width: 100%;
	height: 100%;
	font-weight: 400;
	font-size: 0.875rem;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	// overflow-y: hidden;

	&.is-dark-bg {
		background-color: #000;
	}

	& .base-bar {
		position: fixed;
		bottom: 0;
		z-index: 10;
	}
}
</style>
<style lang="scss">
body.is-noscroll {
	position: relative;
}
</style>