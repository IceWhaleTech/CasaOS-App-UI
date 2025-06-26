export const usei18n = () => {
	const i18n = (data, fallback = "en_us") => {
		let lowerCaseLang = localStorage.getItem("lang")?.toLocaleLowerCase() || "en_us";
		let upperCaseLang = localStorage.getItem("lang")?.toLocaleUpperCase() || "EN_US";
		let langArr = lowerCaseLang.split("_");
		let lowerAndUpperCaseLang = langArr[0] + "_" + langArr[1].toUpperCase();
		let UpperAndLowerCaseLang = langArr[0].toUpperCase() + "_" + langArr[1];
		return data?.["custom"] ||
			data?.[lowerCaseLang] ||
			data?.[upperCaseLang] ||
			data?.[lowerAndUpperCaseLang] ||
			data?.[UpperAndLowerCaseLang] ||
			data?.[fallback] ||
			data?.["en_US"] ||
			data?.["EN_US"] ||
			data?.["EN_us"];
	};
	return { i18n };
};
