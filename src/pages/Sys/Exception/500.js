import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import Exception from '@/components/Exception';

const Exception500 = () => (
  <Exception
    type="500"
    desc="抱歉，服务器出错了"
    actions={<Button type="primary" onClick={()=>{router.goBack()}}>刷新</Button>}
  />
);

export default Exception500;
