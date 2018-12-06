import React from 'react';
import CFormItem from '@/components/CFormItem';

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

export default (item, form) => {
  const {
    formType,
    key,
    initialValue,
    label,
    isRequired,
    props = {},
    formitemprops = {},
    rules = [],
    fieldDecoratorOptions = {},
  } = item;

  let InputType = null;
  const defaultProps = {
    form,
    name: key,
    initialValue,
    formitemprops: {
      label,
      ...formitemprops,
    },
    fieldDecoratorOptions,
    ...props,
  };
  const defaultRule = [
    {
      required: isRequired,
      message: `请输入${label}`,
    },
  ];
  switch (formType) {
    case 'CInputNumber':
      InputType = (
        <CInputNumber
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[
            ...defaultRule,
            {
              pattern: /^[0-9]\d*$/,
              message: ' 请输入正整数!',
            },
            ...rules,
          ]}
        />
      );
      break;
    case 'CInputMoney':
      InputType = (
        <CInputMoney
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[
            ...defaultRule,
            {
              pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
              message: ' 格式不正确(精确到小数点后2位)',
            },
            ...rules,
          ]}
        />
      );
      break;
    case 'CInputPhone':
      InputType = (
        <CInputPhone
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[
            ...defaultRule,
            {
              pattern: /^1[345678]\d{9}$/,
              message: ' 格式不正确',
            },
            ...rules,
          ]}
        />
      );
      break;
    case 'CSelect':
      InputType = (
        <CSelect
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          selectOptions={item.selectOptions || []}
        />
      );
      break;
    case 'CSelectDynamic':
      InputType = (
        <CSelectDynamic
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          dictionaryKey={item.dictionaryKey}
          fetchUrl={item.fetchUrl}
        />
      );
      break;
    case 'CSelectGroup':
      InputType = (
        <CSelectGroup
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          selectOptions={item.selectOptions || []}
        />
      );
      break;
    case 'CSelectGroupDynamic':
      InputType = (
        <CSelectGroupDynamic
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          dictionaryKey={item.dictionaryKey}
          fetchUrl={item.fetchUrl}
        />
      );
      break;
    case 'CCascader':
      InputType = (
        <CCascader
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          options={item.options || []}
        />
      );
      break;
    case 'CCascaderDynamic':
      InputType = (
        <CCascaderDynamic
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          dictionaryKey={item.dictionaryKey}
          fetchUrl={item.fetchUrl}
        />
      );
      break;
    case 'CSelectDynamicTree':
      InputType = (
        <CSelectDynamicTree
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          dictionaryKey={item.dictionaryKey}
          fetchUrl={item.fetchUrl}
        />
      );
      break;
    case 'CDatePicker':
      InputType = (
        <CDatePicker
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;
    case 'CRangePicker':
      InputType = (
        <CRangePicker
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;
    case 'CMonthPicker':
      InputType = (
        <CMonthPicker
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;
    case 'CTimePicker':
      InputType = (
        <CTimePicker
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;
    case 'CCheckboxGroup':
      InputType = (
        <CCheckboxGroup
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          selectOptions={item.selectOptions || []}
        />
      );
      break;
    case 'CRadioGroup':
      InputType = (
        <CRadioGroup
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          selectOptions={item.selectOptions || []}
        />
      );
      break;
    case 'CTextArea':
      InputType = (
        <CTextArea
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;
    case 'CUpload':
      InputType = (
        <CUpload
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
          action={item.action}
          listType={item.listType || 'picture-card'}
          maxFileCounts={item.maxFileCounts || 10}
          maxFileSize={item.maxFileSize || 5}
        />
      );
      break;
    case 'CInput':
    default:
      InputType = (
        <CInput
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;
  }
  return InputType;
};
