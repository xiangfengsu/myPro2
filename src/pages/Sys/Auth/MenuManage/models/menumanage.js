import { create, query, update, remove } from '@/core/service/generalApi';
import { showStautsMessageHandle } from '@/utils/statusCode';

function formatter(data = []) {
  return data.map(item => {
    const { id } = item;
    const result = {
      ...item,
      key: id,
    };
    if (item.children && item.children.length !== 0) {
      result.children = formatter(item.children);
    } else {
      delete result.children;
    }
    return result;
  });
}

export default {
  namespace: 'menumanage',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    statusCode: 200,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload, '/sys/menu/tree');
      if (response) {
        const { code = 200, body } = response;
        yield put({
          type: 'save',
          payload: {
            data: formatter(body),
            statusCode: code,
          },
        });
      } else {
        showStautsMessageHandle('error');
      }
    },
    *update({ payload }, { call, put }) {
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: true,
        },
      });
      const response = yield call(update, payload, '/sys/menu/update');
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: false,
        },
      });
      if (response) {
        const { code = 200, body } = response;
        if (code === 200) {
          yield put({
            type: 'modalVisible',
            payload: {
              modalVisible: false,
            },
          });
          yield put({
            type: 'save',
            payload: {
              data: formatter(body),
              statusCode: code,
            },
          });
        }
        showStautsMessageHandle('menumanage', 'update', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
    *add({ payload }, { call, put }) {
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: true,
        },
      });
      const response = yield call(create, payload, '/sys/menu/save');
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: false,
        },
      });
      if (response) {
        const { code = 200, body } = response;
        if (code === 200) {
          yield put({
            type: 'modalVisible',
            payload: {
              modalVisible: false,
            },
          });
          yield put({
            type: 'save',
            payload: {
              data: formatter(body),
              statusCode: code,
            },
          });
        }
        showStautsMessageHandle('menumanage', 'add', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(remove, payload, '/sys/menu/del');
      if (response) {
        const { code = 200, body } = response;
        if (code === 200) {
          yield put({
            type: 'save',
            payload: {
              data: formatter(body),
              statusCode: code,
            },
          });
        }
        showStautsMessageHandle('menumanage', 'delete', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
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
        data: {
          list: action.payload.data,
        },
        statusCode: action.payload.statusCode,
      };
    },
  },
};
