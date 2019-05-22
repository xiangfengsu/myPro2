import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { accountLogin, accountLoginOut } from '@/services/login';
import { queryPost } from '@/core/service/generalApi';
import defaultSettings from '@/defaultSettings';

const { mobileValid } = defaultSettings;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default {
  namespace: 'login',

  state: {
    type: 'account',
    status: undefined,
    errorMessage: '',
    statusCode: 200,
    isVaildMobile: false,
    mobileValue: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      Object.assign(payload, {
        mobileValid,
      });
      const response = yield call(accountLogin, payload, '/sys/doLogin');
      if (response) {
        const { code, body = {} } = response;
        const errorMessage = {
          200: '登录成功',
          100: '验证码错误',
          101: '用户名或密码错误',
          // 202: '手机号码验证'
        };
        yield put({
          type: 'changeLoginStatus',
          payload: {
            type: payload.type,
            status: code !== 200 ? (code === 202 ? 'ok' : 'error') : 'ok',
            statusCode: code,
            errorMessage: errorMessage[code],
          },
        });
        if (code === 200) {
          yield put({
            type: 'changeLoginStatus',
            status: 'ok',
            errorMessage: '',
            statusCode: 200,
            isVaildMobile: false,
            mobileValue: '',
          });
          yield call(delay, 300);
          yield put(routerRedux.replace('/'));
        }
        if (code === 202) {
          const { mobiles } = body;
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: 'ok',
              isVaildMobile: true,
              mobileValue: mobiles,
            },
          });
        }
      }
    },
    *getCaptcha({ payload }, { call }) {
      const response = yield call(queryPost, payload, '/sys/getCaptcha');
      if (response) {
        const { code } = response;
        if (code === 200) {
          message.success('短信发送成功');
        }
      }
    },
    *mobileLogin({ payload }, { call, put }) {
      const response = yield call(queryPost, payload, '/sys/doLoginMobile');
      if (response) {
        const { code } = response;
        const errorMessage = {
          200: '登录成功',
          100: '验证码错误',
          // 202: '手机号码验证'
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
            payload: {
              status: 'ok',
              errorMessage: '',
              statusCode: 200,
              isVaildMobile: false,
              mobileValue: '',
            },
          });
          yield put(routerRedux.replace('/'));
        }
      }
    },
    *logout(_, { call, put }) {
      yield call(accountLoginOut, '/sys/logout');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: undefined,
          statusCode: undefined,
          isVaildMobile: false,
          mobileValue: '',
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
