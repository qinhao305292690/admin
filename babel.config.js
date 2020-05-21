module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["import", {
      "libraryName": "ant-design-vue",
      "libraryDirectory": "lib",  // libraryDirectory 默认为 lib
      "style": "css" ,
    }],
  ]
}
