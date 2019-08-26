import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeader from '@/components/PageHeader';
import defaultSettings from '@/defaultSettings';
import MenuContext from '@/core/layouts/MenuContext';

import GridContent from './GridContent';
import styles from './index.less';

const { pageTabs = false } = defaultSettings;

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => (
  <div style={pageTabs ? null : { margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home="首页"
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={item => item.name}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);
