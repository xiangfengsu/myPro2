import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import Login from '@/components/Login';
import defaultSettings from '@/defaultSettings';
import styles from './Login.less';

const { vcodeUrl, env } = defaultSettings;
const {  UserName, Password, ImgCaptcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
  };

  changeStatusCode = () => {
    this.props.dispatch({
      type: 'login/changeLoginStatus',
      payload: {
        statusCode: 200,
      },
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    const uPlaceholder = env === 'development' ? 'admin' : '请输入用户名';
    const pPlaceholder = env === 'development' ? 'admin' : '请输入密码';
    const cPlaceholder = env === 'development' ? '123' : '请输入验证码';
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          changeCode={this.changeStatusCode}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {login.status === 'error' &&
            login.type === 'account' &&
            !login.submitting &&
            this.renderMessage(login.errorMessage)}
          <UserName name="username" placeholder={uPlaceholder} />
          <Password
            name="password"
            placeholder={pPlaceholder}
          />
          <ImgCaptcha
            name="code"
            placeholder={cPlaceholder}
            captcha={vcodeUrl}
            statuscode={login.statusCode || ''}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
