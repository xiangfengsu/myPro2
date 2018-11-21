import React from 'react';
import defaultSettings from '@/defaultSettings';
import styles from './UserLayout.less';

const { title } = defaultSettings;
class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <span className={styles.title}>{title}</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default UserLayout;
