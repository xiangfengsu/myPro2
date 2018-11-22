import defaultSettings from '../src/defaultSettings';

const { env } = defaultSettings;
const formTypeRoute =
  env === 'development'
    ? [
        {
          name: '表单类型',
          icon: 'book',
          path: 'formItemType/formItemTypePage',
          menutype: 2,
          component: './Sys/FormType/route/FormType',
        },
      ]
    : [];

export const UserRouter = [
  {
    path: '/user',
    component: '../core/layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './Sys/Login/route/Login', menutype: 2 },
    ],
  },
];

export const AppRouter = [
  ...formTypeRoute,
  {
    name: '权限管理',
    icon: 'setting',
    path: '/permission',
    menutype: 1,
    routes: [
      {
        name: '部门管理',
        path: '/permission/department',
        menutype: 2,
        component: './Sys/Auth/Department/route/Department',
      },
      {
        name: '菜单管理',
        path: '/permission/menumanage',
        menutype: 2,
        component: './Sys/Auth/MenuManage/route/MenuManage',
      },
      {
        name: '角色管理',
        path: '/permission/rolemanage',
        menutype: 2,
        component: './Sys/Auth/RoleManage/route/RoleManage',
      },
      {
        name: '用户管理',
        path: '/permission/usermanage',
        menutype: 2,
        component: './Sys/Auth/UserManage/route/UserManage',
      },
      {
        name: '系统日志',
        path: '/permission/systemlog',
        menutype: 2,
        component: './Sys/Auth/SystemLog/route/SystemLog',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: '/exception',
    hideInMenu: true,
    routes: [
      // exception
      {
        path: '/exception/403',
        name: '403',
        component: './Sys/Exception/403',
        menutype: 2,
      },
      {
        path: '/exception/404',
        name: '404',
        component: './Sys/Exception/404',
        menutype: 2,
      },
      {
        path: '/exception/500',
        name: '500',
        component: './Sys/Exception/500',
        menutype: 2,
      },
    ],
  },
  {
    path: '/account/settings',
    name: '个人中心',
    hideInMenu: true,
    component: './Sys/User/Settings/route/Settings',
    menutype: 2,
  },
  {
    component: '404',
  },
];
