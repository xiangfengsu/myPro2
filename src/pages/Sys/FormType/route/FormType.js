import React, { PureComponent, Fragment } from 'react';
import { Form, Row, Col, Card, Button, Popover, Modal, message } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { renderFormItem } from '@/core/common/formItem';
import { formItemRemoveInitValue } from '@/utils/utils';
import { FormItems } from './pageConfig';

const FormItem = Form.Item;
@Form.create()
class Index extends PureComponent {
  state = {
    modalVisible: false,
    currentItem: {},
    currentFormItems: FormItems,
  };

  showModalVisibel = item => {
    this.setState({
      modalVisible: true,
      currentItem: item,
    });
  };

  hideModalVisibel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('values ', values); // eslint-disable-line
      }
    });
  };

  handleReset = e => {
    e.preventDefault();
    this.setState(preState => ({
      currentFormItems: formItemRemoveInitValue(preState.currentFormItems),
    }));
    this.props.form.resetFields();
  };

  renderCopy = item => {
    const code = JSON.stringify(item, null, '\t');
    return (
      <CopyToClipboard text={code} onCopy={() => message.success('复制成功', 2)}>
        <div style={{ cursor: 'pointer' }}>复制代码</div>
      </CopyToClipboard>
    );
  };

  renderFormItem = () => {
    const { form } = this.props;
    const { currentFormItems } = this.state;
    // console.log(currentFormItems);
    return currentFormItems.map(item => {
      const InputType = renderFormItem(item, form);
      return (
        <Col lg={item.colSpan || 8} md={12} sm={24} key={item.key} style={{ marginBottom: 24 }}>
          {/* <Popover>

          </Popover> */}
          <Card
            hoverable
            actions={[
              <Popover content={this.renderCode1(item)} title={this.renderCopy(item)}>
                查看属性
              </Popover>,
            ]}
            title={item.label}
          >
            <FormItem hasFeedback={item.hasFeedback}>{InputType}</FormItem>
          </Card>
        </Col>
      );
    });
  };

  renderCode1 = item => {
    const code = JSON.stringify(item, null, '\t');
    return (
      <div>
        <SyntaxHighlighter language="json" style={atomDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  renderCode = () => {
    const { currentItem } = this.state;
    const code = JSON.stringify(currentItem, null, '\t');
    return (
      <SyntaxHighlighter language="json" style={atomDark}>
        {code}
      </SyntaxHighlighter>
    );
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <Fragment>
        <Card bordered={false} loading={false}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={24}>{this.renderFormItem()}</Row>
            <Row>
              <Col key="button">
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button htmlType="reset" style={{ marginLeft: 24 }} onClick={this.handleReset}>
                    重置
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Modal
          destroyOnClose
          visible={modalVisible}
          footer={null}
          onCancel={() => this.hideModalVisibel()}
        >
          {this.renderCode()}
        </Modal>
      </Fragment>
    );
  }
}
export default Index;
