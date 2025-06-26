const i18n = function (data, fallback = "en_us") {
	let lowerCaseLang = localStorage.getItem("lang")?.toLocaleLowerCase() || "en_us";
	let upperCaseLang = localStorage.getItem("lang")?.toLocaleUpperCase() || "EN_US";
	let langArr = lowerCaseLang.split("_");
	let lowerAndUpperCaseLang = langArr[0] + "_" + langArr[1].toUpperCase();
	let UpperAndLowerCaseLang = langArr[0].toUpperCase() + "_" + langArr[1];
	let returnData =
		data?.["custom"] ||
		data?.[lowerCaseLang] ||
		data?.[upperCaseLang] ||
		data?.[lowerAndUpperCaseLang] ||
		data?.[UpperAndLowerCaseLang] ||
		data?.[fallback] ||
		data?.["en_US"] ||
		data?.["EN_US"] ||
		data?.["EN_us"];
	return returnData;
};

// Common usage
const ice_i18n = i18n;
export { ice_i18n };

// vue usage
export default {
	methods: {
		i18n,
	},
};
