import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import omit from 'omit.js';
import QRcode from '@/components/QRcode/index';
import ItemMap from './map';
import LoginContext from './loginContext';
import styles from './index.less';

const FormItem = Form.Item;

class WrapFormItem extends Component {
  static defaultProps = {
    getCaptchaButtonText: '获取验证码',
    getCaptchaSecondText: '秒',
  };

  state = {
    count: 0,
  };

  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
    const options = {
      rules: rules || customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  render() {
    const { count } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      updateStatusCode,
      type,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};
    if (type === 'ImgCaptcha') {
      const { captcha, statuscode } = this.props;
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={14}>
              {getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
            </Col>
            <Col span={8} offset={2}>
              <QRcode
                captcha={captcha}
                statuscode={statuscode}
                updateStatusCode={updateStatusCode}
              />
            </Col>
          </Row>
        </FormItem>
      );
    }
    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={14}>
              {getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}
            </Col>
            <Col span={9} offset={1}>
              <Button
                disabled={count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }

    if (type === 'Mobile') {
      const { selectOptions = [] } = this.props;
      if (selectOptions.length > 0) {
        const [firstValue] = selectOptions;
        options.initialValue = firstValue;

        return (
          <FormItem>
            {getFieldDecorator(name, options)(
              <Select size="large">
                {selectOptions.map(opt => {
                  return (
                    <Select.Option value={opt} key={opt}>
                      {opt}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
        );
      }
      throw new Error('mobiles length must be greater than 1');
    }

    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          updateStatusCode={context.updateStatusCode}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem;
