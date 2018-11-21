import modelExtend from 'dva-model-extend';
import { tablePageModel } from '@/core/common/baseModel';
import { create, update, remove, queryPost } from '@/core/service/generalApi';
import { showStautsMessageHandle } from '@/utils/statusCode';

export default modelExtend(tablePageModel, {
  namespace: 'rolemanage',
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPost, payload, '/sys/role/list');
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
    *update({ payload }, { call, put }) {
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: true,
        },
      });
      const response = yield call(update, payload, '/sys/role/update');
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
              data: body,
              statusCode: code,
            },
          });
        }
        showStautsMessageHandle('rolemanage', 'update', code);
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
      const response = yield call(create, payload, '/sys/role/save');
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
              data: body,
              statusCode: code,
            },
          });
        }
        showStautsMessageHandle('rolemanage', 'add', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(remove, payload, '/sys/role/del');
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
        }
        showStautsMessageHandle('rolemanage', 'delete', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
  },
});
