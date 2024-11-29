const webpack = require("webpack");
const { execSync } = require("child_process");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const commitHash = execSync("git describe --always").toString().trim();
const isProd = process.env.NODE_ENV === "prod";

module.exports = {
	publicPath: "/modules/icewhale_app",
	runtimeCompiler: true,
	lintOnSave: false,
	productionSourceMap: false,
	css: {
		loaderOptions: {
			postcss: {
				postcssOptions: {
					plugins: [require("tailwindcss"), require("autoprefixer")],
				},
			},
			sass: {
				sassOptions: {
					includePaths: ["./node_modules", "./src/assets"],
				},
			},
		},
	},
	chainWebpack: (config) => {
		// Handle .mjs files
		config.module
			.rule("mjs")
			.test(/\.mjs$/)
			.type("javascript/auto")
			.include.add(/node_modules/)
			.end();

		// Handle .scss files
		const scssRule = config.module.rule("scss");
		scssRule.oneOfs.store.forEach((item) => {
			item.use("style-resources-loader")
				.loader("style-resources-loader")
				.options({
					patterns: ["./src/assets/scss/common/_variables.scss", "./src/assets/scss/common/_color.scss"],
				})
				.end()
				.use("postcss-loader")
				.loader("postcss-loader")
				.end();
		});

		// Handle .css files
		config.module.rule("css").oneOfs.store.forEach((item) => {
			item.use("postcss-loader").loader("postcss-loader");
		});



		// Plugins
		config.plugin("ignore").use(
			new webpack.IgnorePlugin({
				resourceRegExp: /^\.\/locale$/, 
				contextRegExp: /moment$/, 
			})
		);
		config.plugin("define").use(webpack.DefinePlugin, [
			{
				"process.env": JSON.stringify(process.env),
				MAIN_APP_VERSION_ID: JSON.stringify(commitHash),
				BUILT_TIME: JSON.stringify(new Date().toString()),
			},
		]);
		// 添加 NodePolyfillPlugin wbepack5 专用插件
		config.plugin("node-polyfill").use(NodePolyfillPlugin);

		if (isProd) {
			// Production only
			config.output.filename("[name].[contenthash:8].js").chunkFilename("[name].[contenthash:8].js").end();
			config.optimization.minimize(true);
			config.optimization.splitChunks({
				chunks: "all",
			});

			config.optimization
				.minimizer("css")
				.use(CssMinimizerPlugin, [
					{ minimizerOptions: { preset: ["default", { discardComments: { removeAll: true } }] } },
				]);
			config.optimization.minimizer("terser").use(TerserPlugin, [
				{
					terserOptions: {
						compress: {
							drop_console: true,
						},
					},
				},
			]);
			// config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
		}
	},
	devServer: {
		open: true,
		port: 8080,
		hot: true,
		proxy: {
			"/v1": {
				target: `http://${process.env.VUE_APP_DEV_IP}:${process.env.VUE_APP_DEV_PORT}`,
				changeOrigin: true,
			},
			"/v2": {
				target: `http://${process.env.VUE_APP_DEV_IP}:${process.env.VUE_APP_DEV_PORT}`,
				changeOrigin: true,
			},
		},
	},
};
