module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
}
