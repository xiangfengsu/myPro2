export const tablePageModel = {
  state: {
    data: {
      list: [],
      pagination: {},
    },
    modalVisible: false,
    confirmLoading: false,
  },
  reducers: {
    modalVisible(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changgeConfirmLoading(state, { payload }) {
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
