module.exports = {
	content: [
		'./public/index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}'
	],
	theme: {
        extend: {
            fontFamily: {
                'roboto': ['Roboto'],
            },
            screens: {
                'max-sm': { 'max': '640px' },
                'max-md': { 'max': '768px' },
                'max-lg': { 'max': '1024px' },
                'max-xl': { 'max': '1280px' },
                'max-2xl': { 'max': '1536px' },
            },
            borderRadius: {
                '2lg': '0.625rem',
            },
            colors: {
                // follow figma OLD
                "gary/primary": "rgba(48, 50, 51, 1)",
                "gary/300": "rgba(228, 232, 236, 1)",
                "gary/500": "rgba(172, 184, 195, 1)",
                gray: {
                    // 背景灰色 2
                    50: 'rgba(247, 249, 250, 1)',
                    // 背景灰色 1
                    100: 'rgba(242, 244, 245, 1)',
                    200: 'rgba(192, 198, 204, 1)',
                    800: 'rgba(41, 52, 61, 1)',
                },
                // 灰色
                neutral: {
                    // 次要文字
                    400: 'rgba(144, 149, 153, 1)',
                },
                // 黑色
                zinc: {
                    // 三级灰色
                    50: 'rgba(238, 242, 245, 1)',
                    // 二级灰色
                    100: 'rgba(230, 234, 237, 1)',
                    // 一级灰色
                    200: 'rgba(223, 227, 230, 1)',
                    600: 'rgba(96, 99, 102, 1)',
                    800: 'rgba(48, 50, 51, 1)',
                },
                // 蓝色
                sky: {
                    500: 'rgba(15, 143, 255, 1)',
                    600: 'rgba(0, 122, 229, 1)',
                    700: 'rgba(0, 103, 194, 1)', // hover button
                },
                slate: {
                    50: 'rgba(244, 248, 252, 1)'
                },
                brand: {
                    50: 'rgba(229, 243, 255, 1)',
                    400: 'rgba(15, 143, 255, 1)',
                },
                // yellow 
                tertiary: {
                    100: 'rgba(255, 244, 215, 1)',
                    300: 'rgba(212, 156, 2, 1)',
                },
                // 红色
                red: {
                    300: 'rgba(255, 184, 153, 1)', // 设计的颜色命名体系与 figma 的 tailwin 插件命名规则不互通，导致一个名称下的颜色并不相关。// 以 figma 插件提示为准
                    500: 'rgba(242, 98, 36, 1)',

                },
                // 橙色 default
                orange: {
                    500: 'rgba(242, 98, 36, 1)',
                },
                // 橙色
                amber: {
                    500: 'rgba(255, 149, 0, 1)',
                },
                // 浅红 rose
                rose: {
                    100: 'rgba(255, 234, 225, 1)',
                },
                // 紫色
                violet: {
                    500: 'rgba(135, 113, 244, 1)',
                },
                // 绿色 default
                green: {
                    400: 'rgba(51, 204, 128, 1)',
                    500: 'rgba(40, 195, 34, 1)',
                    default: "rgba(40, 195, 34, 1)",
                },
                // NEW
                // Semantic transformation.
                "Blue/Default": "rgba(0, 122, 229, 1)",
                "Blue/Hover": "rgba(0, 103, 194, 1)",
                "Blue/Active": "rgba(0, 87, 163, 1)",
                "Blue/Secondary": "rgba(128, 195, 255, 1)",
                "Blue/Tertiary": "rgba(229, 243, 255, 1)",

                "Yellow/Default": "rgba(232, 171, 2, 1)",
                "Yellow/Hover": "rgba(212, 156, 2, 1)",
                "Yellow/Active": "rgba(192, 141, 2, 1)",
                "Yellow/Secondary": "rgba(253, 222, 135, 1)",
                "Yellow/Tertiary": "rgba(255, 244, 215, 1)",

                "Green/Default": "rgba(40, 195, 34, 1)",
                "Green/Hover": "rgba(35, 169, 30, 1)",
                "Green/Active": "rgba(31, 152, 27, 1)",
                "Green/Secondary": "rgba(164, 236, 147, 1)",
                "Green/Tertiary": "rgba(213, 247, 212, 1)",

                "Red/Default": "rgba(242, 98, 36, 1)",
                "Red/Hover": "rgba(217, 80, 22, 1)",
                "Red/Active": "rgba(204, 75, 20, 1)",
                "Red/Secondary": "rgba(255, 184, 153, 1)",
                "Red/Tertiary": "rgba(255, 234, 225, 1)",

                // PENDING
                "Gary/Primary": "rgba(48, 50, 51, 1)",
                "Gary/Normal": "rgba(96, 99, 102, 1)",
                "Gary/Secondary": "rgba(144, 149, 153, 1)",
                "Gary/Placeholder": "rgba(192, 198, 204, 1)",

                "Gary/500": "rgba(223, 227, 230, 1)",
                "Gary/400": "rgba(230, 234, 237, 1)",
                "Gary/300": "rgba(238, 242, 245, 1)",
                "Gary/200": "rgba(244, 248, 252, 1)",
                "Gary/100": "rgba(242, 244, 245, 1)",
                "Gary/50": "rgba(247, 249, 250, 1)",
                "Brand/900": "rgba(0, 49, 92, 1)",
                "Brand/800": "rgba(0, 68, 128, 1)",
                "Brand/700": "rgba(0, 87, 163, 1)",
                "Brand/600": "rgba(0, 103, 194, 1)",
                "Brand/500": "rgba(0, 122, 229, 1)",
            },
        },
    },
}