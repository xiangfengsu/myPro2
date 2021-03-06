// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

const path = require('path');

const { title, debugLocal } = defaultSettings;
const targetSysUrl = debugLocal ? 'http://192.168.1.154:9000' : 'http://yapi.rebornauto.cn/mock/11';
const targetApiUrl = debugLocal ? 'http://192.168.1.154:9000' : 'http://yapi.rebornauto.cn/mock/11';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        enable: false, // default false
        // default: 'zh-CN', // default zh-CN
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: false,
        level: 3,
      },
      ...(os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
  ['umi-plugin-routermd', { createRouterMD: true }],
];

export default {
  // add for transfer to umi
  plugins,
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  hash: true,
  history: 'hash',
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  alias: {
    components: path.resolve('src/components/'),
    layouts: path.resolve('src/core/layouts/'),
    utils: path.resolve('src/utils/'),
    common: path.resolve('src/core/common/'),
    core: path.resolve('src/core/'),
    pages: path.resolve('src/pages/'),
  },
  proxy: {
    '/api/sys': {
      target: targetSysUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/sys': {
      target: targetSysUrl,
      changeOrigin: true,
    },
    '/api': {
      target: targetApiUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: false,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  context: {
    title,
  },
};
