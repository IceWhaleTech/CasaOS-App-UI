{
  mode: 'development',
  context: '/Users/zhanghengxin/vscode/CasaOS-App-UI',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/zhanghengxin/vscode/CasaOS-App-UI/dist',
    filename: 'js/[name].js',
    publicPath: '/modules/icewhale_app/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': '/Users/zhanghengxin/vscode/CasaOS-App-UI/src',
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules',
      '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/@vue+cli-service@4.5.13_lodash@4.17.21_sass-loader@10.1.1_vue-template-compiler@2.7.16_vue@2.7.16/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      /* config.resolve.plugin('pnp') */
      {}
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/@vue+cli-plugin-babel@4.5.13_@vue+cli-service@4.5.13_core-js@3.36.1_vue@2.7.16/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules',
      '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/@vue+cli-service@4.5.13_lodash@4.17.21_sass-loader@10.1.1_vue-template-compiler@2.7.16_vue@2.7.16/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      /* config.resolve.plugin('pnp-loaders') */
      {}
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('cache-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/cache-loader@4.1.0_webpack@4.36.0/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.cache/vue-loader',
              cacheIdentifier: '23a495bf'
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-loader@15.11.1_cache-loader@4.1.0_css-loader@3.6.0_lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.36.0/node_modules/vue-loader/lib/index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.cache/vue-loader',
              cacheIdentifier: '23a495bf'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/url-loader@2.3.0_file-loader@4.3.0_webpack@4.36.0/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/file-loader@4.3.0_webpack@4.36.0/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/file-loader@4.3.0_webpack@4.36.0/node_modules/file-loader/dist/cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/url-loader@2.3.0_file-loader@4.3.0_webpack@4.36.0/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/file-loader@4.3.0_webpack@4.36.0/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/url-loader@2.3.0_file-loader@4.3.0_webpack@4.36.0/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/file-loader@4.3.0_webpack@4.36.0/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('style-resources-loader') */
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    './src/assets/scss/common/_variables.scss',
                    './src/assets/scss/common/_color.scss'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('style-resources-loader') */
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    './src/assets/scss/common/_variables.scss',
                    './src/assets/scss/common/_color.scss'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('style-resources-loader') */
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    './src/assets/scss/common/_variables.scss',
                    './src/assets/scss/common/_color.scss'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('style-resources-loader') */
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    './src/assets/scss/common/_variables.scss',
                    './src/assets/scss/common/_color.scss'
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/sass-loader@10.1.1_sass@1.74.1_webpack@4.36.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    load: function () { /* omitted long function */ },
                    compile: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileString: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    compileStringAsync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    initAsyncCompiler: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    Compiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    AsyncCompiler: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    Value: function Value0() {
                    },
                    SassBoolean: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassArgumentList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassCalculation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationOperation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    CalculationInterpolation: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassColor: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassFunction: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMixin: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassList: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassMap: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassNumber: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    SassString: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    sassNull: {},
                    sassTrue: {
                      value: true
                    },
                    sassFalse: {
                      value: false
                    },
                    Exception: function () { /* omitted long function */ },
                    Logger: {
                      silent: {
                        warn: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        },
                        debug: function () {
                          return _call(f, Array.prototype.slice.apply(arguments));
                        }
                      }
                    },
                    NodePackageImporter: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    deprecations: {
                      'call-string': {
                        id: 'call-string',
                        status: 'active',
                        description: 'Passing a string directly to meta.call().',
                        deprecatedIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        },
                        obsoleteIn: {
                          major: 0,
                          minor: 0,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '0.0.0'
                        }
                      },
                      elseif: {
                        id: 'elseif',
                        status: 'active',
                        description: '@elseif.',
                        deprecatedIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 3,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.3.2'
                        }
                      },
                      'moz-document': {
                        id: 'moz-document',
                        status: 'active',
                        description: '@-moz-document.',
                        deprecatedIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 7,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.7.2'
                        }
                      },
                      'relative-canonical': {
                        id: 'relative-canonical',
                        status: 'active',
                        description: null,
                        deprecatedIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 14,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.14.2'
                        }
                      },
                      'new-global': {
                        id: 'new-global',
                        status: 'active',
                        description: 'Declaring new variables with !global.',
                        deprecatedIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 17,
                          patch: 2,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.17.2'
                        }
                      },
                      'color-module-compat': {
                        id: 'color-module-compat',
                        status: 'active',
                        description: 'Using color module functions in place of plain CSS functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 23,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.23.0'
                        }
                      },
                      'slash-div': {
                        id: 'slash-div',
                        status: 'active',
                        description: '/ operator for division.',
                        deprecatedIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 33,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.33.0'
                        }
                      },
                      'bogus-combinators': {
                        id: 'bogus-combinators',
                        status: 'active',
                        description: 'Leading, trailing, and repeated combinators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 54,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.54.0'
                        }
                      },
                      'strict-unary': {
                        id: 'strict-unary',
                        status: 'active',
                        description: 'Ambiguous + and - operators.',
                        deprecatedIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 55,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.55.0'
                        }
                      },
                      'function-units': {
                        id: 'function-units',
                        status: 'active',
                        description: 'Passing invalid units to built-in functions.',
                        deprecatedIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 56,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.56.0'
                        }
                      },
                      'abs-percent': {
                        id: 'abs-percent',
                        status: 'active',
                        description: 'Passing percentages to the Sass abs() function.',
                        deprecatedIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 65,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.65.0'
                        }
                      },
                      'duplicate-var-flags': {
                        id: 'duplicate-var-flags',
                        status: 'active',
                        description: 'Using !default or !global multiple times for one variable.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.0'
                        }
                      },
                      'null-alpha': {
                        id: 'null-alpha',
                        status: 'active',
                        description: 'Passing null as alpha in the JS API.',
                        deprecatedIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 62,
                          patch: 3,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.62.3'
                        }
                      },
                      'fs-importer-cwd': {
                        id: 'fs-importer-cwd',
                        status: 'active',
                        description: 'Using the current working directory as an implicit load path.',
                        deprecatedIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        },
                        obsoleteIn: {
                          major: 1,
                          minor: 73,
                          patch: 0,
                          preRelease: [],
                          build: [],
                          _version$_text: '1.73.0'
                        }
                      },
                      'import': {
                        id: 'import',
                        status: 'future',
                        description: '@import rules.',
                        deprecatedIn: null,
                        obsoleteIn: null
                      },
                      'user-authored': {
                        id: 'user-authored',
                        status: 'user',
                        description: null,
                        deprecatedIn: null,
                        obsoleteIn: null
                      }
                    },
                    Version: function () {
                      return _call(f, this, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.74.1\t(Sass Compiler)\t[Dart]\ndart2js\t3.3.3\t(Dart Compiler)\t[Dart]',
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    types: {
                      Boolean: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    NULL: {},
                    TRUE: {
                      value: true
                    },
                    FALSE: {
                      value: false
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/css-loader@3.6.0_webpack@4.36.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('cache-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/cache-loader@4.1.0_webpack@4.36.0/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.cache/babel-loader',
              cacheIdentifier: '5de6e213'
            }
          },
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: '/Users/zhanghengxin/vscode/CasaOS-App-UI/node_modules/.pnpm/babel-loader@8.3.0_@babel+core@7.24.4_webpack@4.36.0/node_modules/babel-loader/lib/index.js'
          }
        ]
      },
      /* config.module.rule('mjs') */
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
        include: [
          /node_modules/
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          sourceMap: true,
          cache: true,
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env.NODE_ENV': '"dev"',
        'process.env.VUE_APP_DEV_IP': '"10.0.0.68"',
        'process.env.VUE_APP_DEV_PORT': '"80"',
        'process.env.VUE_APP_BASE_URL': undefined,
        MAIN_APP_VERSION_ID: '"v0.0.6-102-g7c03918"',
        BUILT_TIME: '"Tue Apr 09 2024 10:03:39 GMT+0800 (中国标准时间)"'
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'casaos-main',
        templateParameters: function () { /* omitted long function */ },
        template: '/Users/zhanghengxin/vscode/CasaOS-App-UI/public/index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: '/Users/zhanghengxin/vscode/CasaOS-App-UI/public',
          to: '/Users/zhanghengxin/vscode/CasaOS-App-UI/dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    /* config.plugin('ignore') */
    {}
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  }
}
