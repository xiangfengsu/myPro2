const env = process.env.NODE_ENV;
const appConfig = {
  env,
  title: '脚手架系统',
  isLocalMenus: env === 'development',
  // localMenus: menuData,
  autoLogin: false,
  whiteListPath: [
    {
      path: '/account/settings',
      name: '个人中心',
    },
    {
      path: '/exception/403',
      name: '403',
    },
    {
      path: '/exception/404',
      name: '404',
    },
    {
      path: '/exception/500',
      name: '500',
    },
  ],
  vcodeUrl: env === 'development' ? 'http://test.if.rebornauto.cn/sys/vcode' : '/sys/vcode',
  domain: '',
};

module.exports = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: true, // sticky siderbar
  ...appConfig,
};
