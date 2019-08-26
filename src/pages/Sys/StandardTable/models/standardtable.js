import { queryPost } from '@/core/service/generalApi';

export default {
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPost, payload, '/sys/log/list');
      if (response) {
        const { code = 200, body } = response;
        yield put({
          type: 'save',
          payload: {
            data: body,
            statusCode: code,
          },
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
