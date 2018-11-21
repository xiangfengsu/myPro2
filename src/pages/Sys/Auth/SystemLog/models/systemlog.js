import { queryPost } from '@/core/service/generalApi';
import { showStautsMessageHandle } from '@/utils/statusCode';

export default {
  namespace: 'systemlog',
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
      } else {
        showStautsMessageHandle('error');
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};
