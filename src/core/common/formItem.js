import React from 'react';
import {
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  TimePicker,
  DatePicker,
  Checkbox,
  Radio,
  Cascader,
} from 'antd';
import UploadImg from '@/components/FormItem/UploadImg/Index';
import DynamicInput from '@/components/FormItem/DynamicInput/Index';
import DynamicCascader from '@/components/FormItem/DynamicCascader/Index';
import DynamicSelect from '@/components/FormItem/DynamicSelect/Index';
import DynamicSelectTree from '@/components/FormItem/DynamicSelectTree/Index';
import DynamicSelectGroup from '@/components/FormItem/DynamicSelectGroup/Index';
import DynamicSelectMenuTree from '@/components/FormItem/MenuDynamicTree/Index';

const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const validateNumber = (value, prevValue) => {
  if (!value) {
    return value;
  }
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  if (reg.test(value) || value === '' || value === '-') {
    return value;
  }
  return prevValue;
};
const validatePlusNumber = (value, prevValue) => {
  if (!value) {
    return value;
  }
  const reg = /^\d+$/;
  if (!Number.isNaN(value) && reg.test(value)) {
    return value;
  }
  return prevValue;
};
const noop = () => {};
export const renderFormItem = (item, form, dispatch) => {
  const { getFieldDecorator } = form;
  const { formType, props = {} } = item;
  let InputType = null;
  switch (formType) {
    case 'input':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: item.errorText || `${item.label}不能为空`,
          },
        ],
      })(
        <Input
          type="text"
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          readOnly={item.isReadOnly}
          onClick={item.onClick ? item.onClick : noop}
          {...props}
        />
      );
      break;
    case 'inputDynamic':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <DynamicInput
          form={form}
          isReadOnly={item.isReadOnly}
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          fetchUrl={item.fetchUrl}
          props={props}
        />
      );
      break;
    case 'inputMail':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: item.errorText || '邮箱格式不正确',
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
          },
        ],
      })(
        <Input
          type="text"
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          readOnly={item.isReadOnly}
          onClick={item.onClick ? item.onClick : noop}
          {...props}
        />
      );
      break;
    case 'inputNumber':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        normalize: (value, prevValue) => validateNumber(value, prevValue),
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <InputNumber
          style={{ width: '100%' }}
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          {...props}
        />
      );
      break;
    case 'inputMoney':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        normalize: (value, prevValue) => validateNumber(value, prevValue),
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
            // pattern: item.pattern,
            // max: item.maxLen
          },
        ],
      })(
        <Input
          style={{ width: '100%' }}
          addonAfter="元"
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          {...props}
        />
      );
      break;
    case 'inputPhone':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        normalize: (value, prevValue) => validatePlusNumber(value, prevValue),
        rules: [
          {
            required: item.isRequired,
            message: item.errorText || '手机号码格式不正确',
            pattern: item.pattern || /^1[34578]\d{9}$/,
          },
        ],
      })(
        <Input
          type="tel"
          maxLength="11"
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          {...props}
        />
      );
      break;
    case 'textArea':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <Input.TextArea
          type="text"
          autosize={item.autosize || { minRows: 5, maxRows: 10 }}
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          {...props}
        />
      );
      break;
    case 'cascader':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <Cascader
          options={item.options || []}
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          {...props}
        />
      );
      break;
    case 'cascaderDynamic':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <DynamicCascader
          form={form}
          dispatch={dispatch}
          cache={item.cache}
          dictionaryKey={item.dictionaryKey}
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          fetchUrl={item.fetchUrl}
          popupContainer={
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
          props={props}
        />
      );
      break;
    case 'select':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue === undefined ? undefined : `${item.initialValue}`,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <Select
          mode={item.multiple ? 'multiple' : ''}
          onSelect={item.onSelect ? item.onSelect : () => {}}
          optionFilterProp={item.searchFilter ? 'children' : ''}
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          getPopupContainer={() =>
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
          {...props}
        >
          {item.selectOptions.map(option => (
            <Select.Option key={`${option.key}`} value={option.key}>
              {option.value}
            </Select.Option>
          ))}
        </Select>
      );
      break;
    case 'selectDynamic':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue === undefined ? undefined : `${item.initialValue}`,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <DynamicSelect
          form={form}
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          multiple={item.multiple}
          fetchUrl={item.fetchUrl}
          searchFilter={item.searchFilter}
          isCheckFirst={item.isCheckFirst}
          cache={item.cache}
          popupContainer={
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
          props={props}
        />
      );
      break;
    case 'selectGroup':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <Select
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          getPopupContainer={() =>
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
          {...props}
        >
          {item.selectOptions.map(option => (
            <Select.OptGroup label={option.label} key={option.key}>
              {option.childrenOptions.map(v => (
                <Select.Option value={v.key} key={v.key}>
                  {v.value}
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))}
        </Select>
      );
      break;
    case 'selectDynamicGroup':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <DynamicSelectGroup
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          multiple={item.multiple}
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          fetchUrl={item.fetchUrl}
          popupContainer={
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
          props={props}
        />
      );
      break;
    case 'selectDynamicTree':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
            validator: (rule, value, callback) => {
              if (item.isRequired && value === undefined) {
                callback('');
              }
              if (item.isRequired && value && value.length === 0) {
                callback('');
              }
              callback();
            },
          },
        ],
      })(
        <DynamicSelectTree
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          fetchUrl={item.fetchUrl}
          disabled={item.disabled}
          multiple={item.multiple}
          showCheckedStrategy={item.showCheckedStrategy}
          extraProp={item.extraProp || {}}
          props={props}
        />
      );
      break;
    case 'selectDynamicMenuTree':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
            validator: (rule, value, callback) => {
              if (item.isRequired && value === undefined) {
                callback('');
              }
              callback();
            },
          },
        ],
      })(
        <DynamicSelectMenuTree
          dispatch={dispatch}
          dictionaryKey={item.dictionaryKey}
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label}`}
          fetchUrl={item.fetchUrl}
          disabled={item.disabled}
          extraProp={item.extraProp || {}}
        />
      );
      break;
    case 'datePicker':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: 'object',
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <DatePicker
          showTime={item.showTime}
          format={item.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
          style={{ width: '100%' }}
          placeholder={item.placeholder || '请选择日期'}
          getCalendarContainer={() =>
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
        />
      );
      break;
    case 'rangePicker':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: 'array',
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <RangePicker
          style={{ width: '100%' }}
          showTime={item.showTime}
          format={item.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
          getCalendarContainer={() =>
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
        />
      );
      break;
    case 'monthPicker':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: 'object',
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <MonthPicker
          placeholder={item.placeholder || '请选择月份'}
          style={{ width: '100%' }}
          getCalendarContainer={() =>
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
        />
      );
      break;
    case 'timePicker':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            type: 'object',
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <TimePicker
          placeholder={item.placeholder || '请选择月份'}
          style={{ width: '100%' }}
          getCalendarContainer={() =>
            (item.popupContainer && document.getElementById(item.popupContainer)) || document.body
          }
        />
      );
      break;
    case 'upload':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
            validator: (rule, value, callback) => {
              if (item.isRequired && !value) {
                callback('');
              }
              if (item.isRequired && value && value.fileList && value.fileList.length === 0) {
                callback('');
              }
              callback();
            },
          },
        ],
      })(
        <UploadImg
          action={item.action}
          maxFileCounts={item.maxLength || item.maxFileCounts}
          multiple={item.multiple}
          acceptType={item.acceptType}
          maxFileSize={item.maxFileSize}
          listType={item.listType}
        />
      );
      break;
    case 'checkboxGroup':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <CheckboxGroup style={{ width: '100%', lineHeight: 'unset' }}>
          <Row>
            {item.options &&
              item.options.map(checkitem => (
                <Col lg={item.itemColSpan || 6} key={checkitem.value} xs={12}>
                  <Checkbox value={checkitem.value}>{checkitem.label}</Checkbox>
                </Col>
              ))}
          </Row>
        </CheckboxGroup>
      );
      break;
    case 'radioGroup':
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: `${item.label}不能为空`,
          },
        ],
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Row>
            {item.options &&
              item.options.map(checkitem => (
                <Col lg={item.itemColSpan || 6} key={checkitem.value} xs={12}>
                  <Radio value={checkitem.value}>{checkitem.label}</Radio>
                </Col>
              ))}
          </Row>
        </RadioGroup>
      );
      break;
    default:
      InputType = getFieldDecorator(item.key, {
        initialValue: item.initialValue,
        rules: [
          {
            required: item.isRequired,
            message: item.errorText || `${item.label}不能为空`,
          },
        ],
      })(
        <Input
          type="text"
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label}`}
          readOnly={item.isReadOnly}
          onClick={item.onClick ? item.onClick : () => {}}
          props={props}
        />
      );
  }
  return InputType;
};
