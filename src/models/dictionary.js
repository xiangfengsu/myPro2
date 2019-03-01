import { queryDic } from '@/services/api';
import omit from 'omit.js';

export default {
  namespace: 'dictionary',
  state: {},
  effects: {
    *query({ payload }, { call, put }) {
      const { dictionaryKey, cache, cb } = payload;
      let list = [];
      if (cache && localStorage[dictionaryKey]) {
        list = JSON.parse(localStorage[dictionaryKey]);
      } else {
        const queryParams = omit(payload, ['cache', 'dictionaryKey', 'cb']);
        const response = yield call(queryDic, queryParams);
        const { body = [], code } = response || {};
        if (code === 200) {
          list = body;
          if (cache) {
            localStorage[dictionaryKey] = JSON.stringify(body);
          }
        }
      }

      yield put({
        type: 'querySuccess',
        payload: {
          [dictionaryKey]: list,
        },
      });
      if (cb) cb(list);
    },
  },

  reducers: {
    querySuccess(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
