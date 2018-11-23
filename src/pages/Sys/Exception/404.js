import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import Exception from '@/components/Exception';

const Exception404 = () => (
  <Exception
    type="404"
    desc="抱歉，你访问的接口或页面不存在"
    actions={<Button type="primary" onClick={()=>{router.goBack()}}>刷新</Button>}
  />
);

export default Exception404;
