import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import defaultSettings from '@/defaultSettings';

const { title } = defaultSettings;
const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 {title}
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
