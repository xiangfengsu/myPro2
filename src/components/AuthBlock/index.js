import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import defaultSettings from '@/defaultSettings';

const { isLocalMenus } = defaultSettings;

@connect(({ user: { currentUser = {} } }) => ({
  btnAuth: currentUser.btnAuth || [],
}))
class AuthBlock extends Component {
  static propTypes = {
    authority: PropTypes.string,
  };

  static defaultProps = {
    authority: '',
  };

  render() {
    const { btnAuth, authority, children } = this.props;

    if (isLocalMenus) return children;

    const content = btnAuth.findIndex(item => item.path === authority) !== -1 ? children : null;
    return <Fragment>{content}</Fragment>;
  }
}
export default AuthBlock;
