/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	content: ["./src/**/*.vue","./src/**/**/*.vue","./src/**/**/**/*.vue"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['BrittiSans', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}