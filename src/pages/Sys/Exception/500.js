import React from 'react';
import { Button } from 'antd';
import router from 'umi/router';
import Exception from '@/components/Exception';

const Exception500 = () => {
  const clearState = () => {
    const { _models = [], _store = {} } = window.g_app || {};
    const { dispatch } = _store;
    _models
      .filter(m => m.namespace !== '@@dva')
      .forEach(m => {
        dispatch({
          type: `${m.namespace}/clear`,
        });
      });
    router.goBack();
  };
  return (
    <Exception
      type="500"
      desc="抱歉，服务器出错了"
      actions={
        <Button
          type="primary"
          onClick={() => {
            clearState();
          }}
        >
          刷新
        </Button>
      }
    />
  );
};

export default Exception500;
