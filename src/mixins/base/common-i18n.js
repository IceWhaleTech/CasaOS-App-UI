
const i18n = function (data, fallback = 'en_us') {
	let lang = localStorage.getItem('lang').toLocaleLowerCase();
	return data?.['custom'] || data?.[lang] || data?.[fallback] || data?.['en_US'];
}

// Common usage
const ice_i18n = i18n
export {ice_i18n};

// vue usage
export default {
	methods: {
		i18n
	}
}