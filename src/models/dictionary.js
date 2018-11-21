import { queryDic } from '@/services/api';

export default {
  namespace: 'dictionary',
  state: {},
  effects: {
    *query({ payload }, { call, put }) {
      const { dictionaryKey, cache } = payload;
      let list = [];
      if (cache && localStorage[dictionaryKey]) {
        list = JSON.parse(localStorage[dictionaryKey]);
      } else {
        delete payload.cache; // eslint-disable-line
        delete payload.dictionaryKey; // eslint-disable-line
        const response = yield call(queryDic, payload);
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
