declare module "*.vue" {
	import Vue from 'vue'
	export default Vue
}

declare module '@/plugins/i18n' {
	const value: any;
	export default value;
}

declare module '@/service/api.js' {
	const value: any;
	export default value;
}

declare module '@/service/index.js' {
	const value: any;
	export default value;
}

declare module '@/events/index.js' {
	const value: any;
	export default value;
}

declare module 'v-animate-css' {
	const value: any;
	export default value;
}

declare module "buefy/src/index.js";

declare var MAIN_APP_VERSION_ID: string;
declare var BUILT_TIME: string;