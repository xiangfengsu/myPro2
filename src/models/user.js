import { queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const { body = {} } = response || {};
      yield put({
        type: 'saveCurrentUser',
        payload: body,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      const { menu = [], user = {}, btn = [] } = action.payload;
      return {
        ...state,
        currentUser: {
          menuList: menu,
          btnAuth: btn,
          ...user,
        },
      };
    },
  },
};
