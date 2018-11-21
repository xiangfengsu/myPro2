import React from 'react';
import PropTypes from 'prop-types';

import { Form, Row, Button, Col, Icon, Tooltip } from 'antd';
import { renderFormItem } from '@/core/common/formItem';

import styles from './Index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
export default class SearchForms extends React.PureComponent {
  static propTypes = {
    formInfo: PropTypes.shape({
      layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
      formItems: PropTypes.array,
    }),
    form: PropTypes.object,
    dispatch: PropTypes.func,
    handleSearchSubmit: PropTypes.func,
    handleFormReset: PropTypes.func,
  };

  static defaultProps = {
    formInfo: {
      layout: 'inline',
      formItems: [],
    },
    form: {},
    dispatch: () => {},
    handleSearchSubmit: () => {},
    handleFormReset: () => {},
  };

  state = {
    expandForm: false,
  };

  getFields = () => {
    const { expandForm } = this.state;
    const {
      formInfo: { formItems },
    } = this.props;
    const count = expandForm ? formItems.length : 2;
    const children = this.renderFormItem(formItems, count);
    const buttonText = expandForm ? '收起' : '展开';
    if (!expandForm) {
      children.push(
        <Col md={8} sm={24} key={children.length}>
          <div
            style={{
              whiteSpace: 'nowrap',
              marginBottom: 24,
              paddingTop: '3px',
            }}
          >
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            {formItems.length > 2 ? (
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                {buttonText} <Icon type={expandForm ? 'up' : 'down'} />
              </a>
            ) : null}
          </div>
        </Col>
      );
    }
    return children;
  };

  handleFormReset = () => {
    const { form, handleFormReset } = this.props;
    form.resetFields();
    handleFormReset();
  };

  handleSearch = e => {
    e.preventDefault();
    const { form, handleSearchSubmit } = this.props;
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      // logs('fieldsValue', fieldsValue);
      handleSearchSubmit(fieldsValue);
    });
  };

  toggleForm = () => {
    this.setState(({ expandForm }) => ({
        expandForm: !expandForm,
      }));
  };

  renderFormItem = (formItems, count) => {
    const { dispatch, form } = this.props;
    return formItems.map((item, i) => {
      const InputType = renderFormItem(item, form, dispatch);
      const Tip = (
        <Tooltip title={item.tooltip}>
          <Icon type="question-circle-o" />
        </Tooltip>
      );
      return (
        <Col
          lg={item.colSpan === 0 ? 0 : item.colSpan || i < count ? 8 : 0}
          md={item.colSpan === 0 ? 0 : i < count ? 8 : 0}
          sm={item.colSpan === 0 ? 0 : i < count ? 8 : 24}
          key={item.key}
        >
          <FormItem
            {...formItemLayout}
            label={item.tooltip ? `${item.label}&nbsp;${Tip}` : item.label}
            // hasFeedback
          >
            {InputType}
          </FormItem>
        </Col>
      );
    });
  };

  render() {
    const {
      formInfo: { layout, formItems },
    } = this.props;
    const { expandForm } = this.state;
    const buttonText = expandForm ? '收起' : '展开';
    return (
      <div className={styles.searchForms}>
        <Form
          layout={layout}
          onSubmit={this.handleSearch}
          // hideRequiredMark={true}
        >
          <Row gutter={{ md: 8, lg: 24, xl: 24 }}>{this.getFields()}</Row>
          {expandForm ? (
            <div style={{ overflow: 'hidden' }}>
              <span style={{ float: 'right', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                {formItems.length > 2 ? (
                  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                    {buttonText} <Icon type="up" />
                  </a>
                ) : null}
              </span>
            </div>
          ) : null}
        </Form>
      </div>
    );
  }
}
