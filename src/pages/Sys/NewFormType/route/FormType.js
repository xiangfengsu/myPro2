import React, { PureComponent, Fragment } from 'react';
import { Divider, Form, Row, Col, Card, Button, Popover, message } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierLakesideDark } from 'react-syntax-highlighter/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import reactElementToJSXString from 'react-element-to-jsx-string';

import { formItemRemoveInitValue } from '@/utils/utils';
import CFormItem from '@/components/CFormItem';

import renderFormItem from '@/core/common/renderFormItem';
import newPageConfig from './newPageConfig';

const {
  CInput,
  CInputNumber,
  CInputMoney,
  CInputPhone,
  CSelect,
  CSelectGroup,
  CCascader,
  CSelectDynamic,
  CSelectGroupDynamic,
  CCascaderDynamic,
  CSelectDynamicTree,
  CDatePicker,
  CRangePicker,
  CMonthPicker,
  CTimePicker,
  CCheckboxGroup,
  CRadioGroup,
  CTextArea,
  CUpload,
} = CFormItem;

const FormItem = Form.Item;
@Form.create()
class Index extends PureComponent {
  state = {
    currentFormItems: newPageConfig(this.props.form),
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
    return currentFormItems.map(item => {
      const InputType = renderFormItem(item, form);
      return (
        <Col lg={item.colSpan || 8} md={12} sm={24} key={item.key} style={{ marginBottom: 24 }}>
          <Card
            hoverable
            actions={[
              <Popover content={this.renderCode(item)} title={this.renderCopy(item)}>
                查看属性
              </Popover>,
            ]}
            title={item.label}
          >
            {InputType}
          </Card>
        </Col>
      );
    });
  };

  renderCode = item => {
    const code = JSON.stringify(item, null, '\t');
    return (
      <div>
        <SyntaxHighlighter language="javascript" style={atelierLakesideDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  renderSyntaxHighlighter = code => {
    const {
      props: { name },
    } = code;
    return (
      <SyntaxHighlighter language="jsx" style={atelierLakesideDark}>
        {/* {jsxToString(code,{
          // displayName:()=>{
          //   return name
          // }
          keyValueOverride:{
            form:'form'
          },
          displayName:name
        })} */}
        {reactElementToJSXString(code, {
          displayName: () => name,
          filterProps: ['form'],
        })}
      </SyntaxHighlighter>
    );
  };

  renderJSXCode = code => {
    const jsxCode = this.renderSyntaxHighlighter(code);
    return (
      <Card
        hoverable
        style={{ marginBottom: 24 }}
        actions={[
          <Popover content={jsxCode} title="所有的表单组件都必须加 form={form} 属性">
            查看属性
          </Popover>,
        ]}
      >
        {code}
      </Card>
    );
  };

  render() {
    const { form } = this.props;
    return (
      <Fragment>
        <Card bordered={false} loading={false}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Divider>表单组件方式</Divider>
            <Row gutter={24}>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CInput
                    form={form}
                    name="CInput"
                    placeholder="CInput"
                    formitemprops={{
                      label: 'CInput',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CInput!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CInputNumber
                    form={form}
                    name="CInputNumber"
                    placeholder="CInputNumber"
                    formitemprops={{
                      label: 'CInputNumber',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CInputNumber!',
                      },
                      {
                        pattern: /^[0-9]\d*$/,
                        message: ' 请输入正整数!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CInputMoney
                    form={form}
                    name="CInputMoney"
                    placeholder="CInputMoney"
                    addonAfter="元"
                    formitemprops={{
                      label: 'CInputMoney',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CInputMoney!',
                      },
                      {
                        pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
                        message: ' 格式不正确(精确到小数点后2位)',
                      },
                    ]}
                    onChange={e => {
                      e.persist();
                    }}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CInputPhone
                    form={form}
                    name="CInputPhone"
                    placeholder="CInputPhone"
                    formitemprops={{
                      label: 'CInputPhone',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CInputPhone!',
                      },
                      {
                        pattern: /^1[345678]\d{9}$/,
                        message: ' 格式不正确',
                      },
                    ]}
                    onChange={e => {
                      e.persist();
                    }}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CSelect
                    form={form}
                    name="CSelect"
                    mode="tag"
                    placeholder="CSelect"
                    formitemprops={{
                      label: 'CSelect',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CSelect!',
                      },
                    ]}
                    selectOptions={[
                      {
                        key: 'select1',
                        value: 'select1',
                      },
                      {
                        key: 'select2',
                        value: 'select2',
                      },
                      {
                        key: 'select3',
                        value: 'select3',
                      },
                    ]}
                    onChange={value => {
                      form.setFieldsValue({
                        CInput: value,
                      });
                    }}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CSelectDynamic
                    form={form}
                    name="CSelectDynamic"
                    dictionaryKey="CSelectDynamicDic"
                    fetchUrl="/api/selectLists2"
                    mode="tag"
                    placeholder="CSelectDynamic"
                    formitemprops={{
                      label: 'CSelectDynamic',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CSelectDynamic!',
                      },
                    ]}
                    onChange={value => {
                      form.setFieldsValue({
                        CInput: value,
                      });
                    }}
                  />
                )}
              </Col>

              <Col lg={8}>
                {this.renderJSXCode(
                  <CSelectGroup
                    form={form}
                    name="CSelectGroup"
                    mode="multiple"
                    placeholder="CSelectGroup"
                    formitemprops={{
                      label: 'CSelectGroup',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CSelectGroup!',
                      },
                    ]}
                    selectOptions={[
                      {
                        label: 'selectGroup1',
                        key: 'selectGroup1',
                        childrenOptions: [
                          {
                            key: 'selectGroup1_1',
                            value: 'selectGroup1_1',
                          },
                          {
                            key: 'selectGroup1_2',
                            value: 'selectGroup1_2',
                          },
                        ],
                      },
                      {
                        label: 'selectGroup2',
                        key: 'selectGroup2',
                        childrenOptions: [
                          {
                            key: 'selectGroup2_1',
                            value: 'selectGroup2_1',
                          },
                          {
                            key: 'selectGroup2_2 ',
                            value: 'selectGroup2_2',
                          },
                        ],
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CSelectGroupDynamic
                    form={form}
                    name="CSelectGroupDynamic"
                    dictionaryKey="CSelectGroupDynamicDic"
                    fetchUrl="/api/selectGroupLists"
                    mode="tag"
                    placeholder="CSelectGroupDynamic"
                    formitemprops={{
                      label: 'CSelectGroupDynamic',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CSelectGroupDynamic!',
                      },
                    ]}
                    onChange={value => {
                      form.setFieldsValue({
                        CInput: value,
                      });
                    }}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CCascader
                    form={form}
                    name="CCascader"
                    placeholder="CCascader"
                    formitemprops={{
                      label: 'CCascader',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CCascader!',
                      },
                    ]}
                    options={[
                      {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                          {
                            value: 'hangzhou',
                            label: 'Hangzhou',
                            children: [
                              {
                                value: 'xihu',
                                label: 'West Lake',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        value: 'jiangsu',
                        label: 'Jiangsu',
                        children: [
                          {
                            value: 'nanjing',
                            label: 'Nanjing',
                          },
                        ],
                      },
                    ]}
                  />
                )}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CSelectDynamicTree
                    form={form}
                    name="CSelectDynamicTree"
                    dictionaryKey="CSelectDynamicTreeDic"
                    fetchUrl="/sys/dept/dic"
                    placeholder="CSelectDynamicTree"
                    formitemprops={{
                      label: 'CSelectDynamicTree',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CSelectDynamicTree!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CCascaderDynamic
                    form={form}
                    name="CCascaderDynamic"
                    dictionaryKey="CCascaderDynamicDic"
                    fetchUrl="/api/cascaderDynamicList"
                    placeholder="CCascaderDynamic"
                    formitemprops={{
                      label: 'CCascaderDynamic',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CCascaderDynamic!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CDatePicker
                    form={form}
                    name="CDatePicker"
                    placeholder="CDatePicker"
                    formitemprops={{
                      label: 'CDatePicker',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CDatePicker!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CRangePicker
                    form={form}
                    name="CRangePicker"
                    formitemprops={{
                      label: 'CRangePicker',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CRangePicker!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CMonthPicker
                    form={form}
                    name="CMonthPicker"
                    placeholder="CMonthPicker"
                    formitemprops={{
                      label: 'CMonthPicker',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CMonthPicker!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={8}>
                {this.renderJSXCode(
                  <CTimePicker
                    form={form}
                    name="CTimePicker"
                    placeholder="CTimePicker"
                    formitemprops={{
                      label: 'CTimePicker',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CTimePicker!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={24}>
                {this.renderJSXCode(
                  <CCheckboxGroup
                    form={form}
                    name="CCheckboxGroup"
                    placeholder="CCheckboxGroup"
                    formitemprops={{
                      label: 'CCheckboxGroup',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CCheckboxGroup!',
                      },
                    ]}
                    selectOptions={[
                      { label: 'Apple', value: 'Apple' },
                      { label: 'Pear', value: 'Pear' },
                      { label: 'Orange', value: 'Orange' },
                      { label: 'Apple1', value: 'Apple1' },
                      { label: 'Pear1', value: 'Pear1' },
                      { label: 'Orange1', value: 'Orange1' },
                      { label: 'Orange2', value: 'Orange3' },
                    ]}
                  />
                )}
              </Col>
              <Col lg={24}>
                {this.renderJSXCode(
                  <CRadioGroup
                    form={form}
                    name="CRadioGroup"
                    placeholder="CRadioGroup"
                    formitemprops={{
                      label: 'CRadioGroup',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CRadioGroup!',
                      },
                    ]}
                    selectOptions={[
                      { label: 'Apple', value: 'Apple' },
                      { label: 'Pear', value: 'Pear' },
                      { label: 'Orange', value: 'Orange' },
                      { label: 'Apple1', value: 'Apple1' },
                      { label: 'Pear1', value: 'Pear1' },
                      { label: 'Orange1', value: 'Orange1' },
                      { label: 'Orange2', value: 'Orange3' },
                    ]}
                  />
                )}
              </Col>
              <Col lg={24}>
                {this.renderJSXCode(
                  <CTextArea
                    form={form}
                    name="CTextArea"
                    placeholder="CTextArea"
                    autosize={{ minRows: 4, maxRows: 7 }}
                    formitemprops={{
                      label: 'CTextArea',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CTextArea!',
                      },
                    ]}
                  />
                )}
              </Col>
              <Col lg={24}>
                {this.renderJSXCode(
                  <CUpload
                    form={form}
                    name="CUpload"
                    multiple
                    action="/sys/file/upload"
                    listType="picture-card"
                    maxFileCounts={3}
                    maxFileSize={1}
                    placeholder="CUpload"
                    formitemprops={{
                      label: 'CUpload',
                    }}
                    rules={[
                      {
                        required: false,
                        message: ' CUpload!',
                      },
                    ]}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Divider>表单快捷方式</Divider>
            </Row>
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
      </Fragment>
    );
  }
}
export default Index;
