import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import {createHtmlPlugin} from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default ({command,mode})=> {
  const env = loadEnv(mode,process.cwd())
  // console.log({
  //   command:command,
  //   mode:mode,
  //   env:env
  // })
  return defineConfig({
    build: {
      productionSourceMap:false, // 或者使用 'inline' 等其他选项
      outDir: 'dist', //指定输出路径
      emptyOutDir: true, //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    },
    server:{
      host: '0.0.0.0', // 主机ip
      https: false, // 是否开启 https
      open: true, // 是否自动在浏览器打开(就是npm run dev后，会自动在浏览器打开这个项目的意思，而不需要我们再手动点一次网页链接)
      port: 5173, // 端口号默认值5173
      // 代理，即'/api'会被转义成'env.VITE_BASE_URL',作用于接口前缀
      proxy: {
        "/v1-api": {
          target: env.VITE_BASE_URL, // 后台接口前缀
          changeOrigin: true, // 是否允许跨域
          secure: false, // 如果是https接口，需要配置这个参数
          rewrite: (path) => path.replace(/^\/v1-api/, ""),
          // bypass(req, res, options) {
          //   const proxyURL = options.target + options.rewrite(req.url);
          //   console.log('proxyURL', proxyURL);
          //   req.headers['x-req-proxyURL'] = proxyURL; 
          //   res.setHeader('x-req-proxyURL', proxyURL); // 设置响应头可以看到
          // }
        }
      },
      hmr:{
        overlay:false // 关闭全屏报错
      }
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
            data: {
                title:"Mtab书签",
            },
        },
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // svg存放位置
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]', // 使用规则
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: { // 自适应配置
      postcss: {
        plugins: [
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 1366, // UI设计稿的宽度，如果你的设计稿是375就改成375  
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
        ]
      }
    },
  })
}
