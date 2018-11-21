import { UserRouter, AppRouter} from './baseRouter.config';
import CustomRouter from './customRouter.config';
export default [
  // user
  ...UserRouter,
  // app
  {
    path: '/',
    component: '../core/layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    authority: [],
    routes: [
      { path: '/' },
      ...CustomRouter,
      ...AppRouter,

    ],
  },
];
