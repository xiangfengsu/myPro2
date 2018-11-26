import { routerRedux } from 'dva/router';
import { getPageQuery } from '@/utils/utils';
import { accountLogin, accountLoginOut } from '@/services/login';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default {
  namespace: 'login',

  state: {
    type: 'account',
    status: undefined,
    errorMessage: '',
    statusCode: 200,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload, '/sys/doLogin');
      if (response) {
        const { code } = response;
        const errorMessage = {
          200: '登录成功',
          100: '验证码错误',
          101: '用户名或密码错误',
        };
        yield put({
          type: 'changeLoginStatus',
          payload: {
            type: payload.type,
            status: code !== 200 ? 'error' : 'ok',
            statusCode: code,
            errorMessage: errorMessage[code],
          },
        });
        if (code === 200) {
          yield put({
            type: 'changeLoginStatus',
            status: 'ok',
          });
          yield call(delay, 300);
          yield put(routerRedux.replace('/'));
        }
      }
    },
    *logout(_, { call, put, select }) {
      yield call(accountLoginOut, '/sys/logout');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: undefined,
          statusCode: undefined,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
