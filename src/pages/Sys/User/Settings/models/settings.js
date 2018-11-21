import { message } from 'antd';
import { update } from '../service/settings';

export default {
  namespace: 'settings',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    statusCode: 200,
  },

  effects: {
    *update({ payload }, { call, put }) {
      const formValue = Object.assign({}, payload);
      delete formValue.cb;
      const response = yield call(update, formValue, '/sys/modify/password');
      if (response) {
        const { code = 200, body } = response;
        if (code === 200) {
          yield put({
            type: 'save',
            payload: {
              data: body,
              statusCode: code,
            },
          });
        } else {
          yield put({
            type: 'changeCode',
            payload: {
              statusCode: code,
            },
          });
        }
        message.success('密码修改成功');
        payload.cb && payload.cb(code); // eslint-disable-line
      }
    },
  },

  reducers: {
    changeCode(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};
