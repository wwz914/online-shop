const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/xiaomi/v2":{
        target:process.env.VUE_APP_BASE_URL
      }
    }
  }
  
})
