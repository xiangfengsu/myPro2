import React from 'react';
import { Button } from 'antd';
import router from 'umi/router';
import Exception from '@/components/Exception';

const Exception404 = () => {
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
      type="404"
      desc="抱歉，你访问的接口或页面不存在"
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

export default Exception404;
