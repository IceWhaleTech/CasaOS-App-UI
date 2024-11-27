const webpack = require("webpack");
const { execSync } = require("child_process");
const commitHash = execSync("git describe --always").toString().trim();
const isProd = process.env.NODE_ENV === "prod";

module.exports = {
    publicPath: "/modules/icewhale_app",
    runtimeCompiler: true,
    lintOnSave: false,
    productionSourceMap: false,
    pluginOptions: {},
    css: {
        extract: isProd
            ? { ignoreOrder: true }
            : false,
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
                    patterns: [
                        "./src/assets/scss/common/_variables.scss",
                        "./src/assets/scss/common/_color.scss",
                    ],
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
        config.plugin("ignore").use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
        config.plugin("define").use(webpack.DefinePlugin, [
            {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                "process.env.VUE_APP_DEV_IP": JSON.stringify(process.env.VUE_APP_DEV_IP),
                "process.env.VUE_APP_DEV_PORT": JSON.stringify(process.env.VUE_APP_DEV_PORT),
                "process.env.VUE_APP_BASE_URL": JSON.stringify(process.env.VUE_APP_BASE_URL),
                MAIN_APP_VERSION_ID: JSON.stringify(commitHash),
                BUILT_TIME: JSON.stringify(new Date().toString()),
            },
        ]);

        if (isProd) {
            // Production only
            config.output
                .filename("[name].[hash:8].js")
                .chunkFilename("[name].[hash:8].js")
                .end();
            config.optimization
                .minimize(true)
                .splitChunks({ chunks: "all" })
                .minimizer("css")
                .use(require.resolve("optimize-css-assets-webpack-plugin"), [{ cssProcessorOptions: { safe: true } }]);

        } else {
            // Development only
            config.plugin("webpack-bundle-analyzer")
                .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
        }
    },
    devServer: {
        open: true,
        port: 8080,
        inline: false, // vue-cli 5 not support inline mode.
        hot: true,
        proxy: {
            "/": {
                target: `http://${process.env.VUE_APP_DEV_IP}:${process.env.VUE_APP_DEV_PORT}`,
                changeOrigin: true,
            },
        },
    },
};