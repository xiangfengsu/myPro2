export default form => [
  {
    formType: 'CInput',
    initialValue: '123',
    isRequired: false,
    key: 'input',
    label: 'CInput',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CInput',
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CInputNumber',
    isRequired: false,
    key: 'inputNumber',
    label: 'CInputNumber',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CInputNumber',
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CInputMoney',
    isRequired: false,
    key: 'inputMoney',
    label: 'CInputMoney',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CInputMoney',
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CInputPhone',
    isRequired: false,
    key: 'inputPhone',
    label: 'CInputPhone',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CInputPhone',
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CSelect',
    isRequired: false,
    key: 'select1',
    label: 'CSelect',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CSelect',
      onChange: value => {
        form.setFieldsValue({
          input: value,
        });
      },
    },
    formitemprops: {
      hasFeedback: false,
    },
    selectOptions: [
      {
        key: 'select1',
        value: 'select1',
      },
      {
        key: 'select2',
        value: 'select2',
      },
    ],
  },
  {
    formType: 'CSelectDynamic',
    isRequired: false,
    key: 'selectDynamic',
    label: 'CSelectDynamic',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CSelectDynamic',
      onChange: value => {
        form.setFieldsValue({
          input: value,
        });
      },
    },
    formitemprops: {
      hasFeedback: false,
    },
    dictionaryKey: 'CSelectDynamicDic',
    fetchUrl: '/api/selectLists2',
  },
  {
    formType: 'CSelectGroup',
    isRequired: false,
    key: 'selectGroup',
    label: 'CSelectGroup',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CSelectGroup',
    },
    formitemprops: {
      hasFeedback: false,
    },
    selectOptions: [
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
    ],
  },
  {
    formType: 'CSelectGroupDynamic',
    isRequired: false,
    key: 'selectGroupDynamic',
    label: 'CSelectGroupDynamic',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CSelectGroupDynamic',
    },
    formitemprops: {
      hasFeedback: false,
    },
    dictionaryKey: 'CSelectGroupDynamicDic',
    fetchUrl: '/api/selectGroupLists',
  },
  {
    formType: 'CCascader',
    isRequired: false,
    key: 'cascader',
    label: 'CCascader',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CCascader',
    },
    formitemprops: {
      hasFeedback: false,
    },
    options: [
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
    ],
  },
  {
    formType: 'CCascaderDynamic',
    isRequired: false,
    key: 'cascaderDynamic',
    label: 'CCascaderDynamic',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CCascaderDynamic',
    },
    formitemprops: {
      hasFeedback: false,
    },
    dictionaryKey: 'CCascaderDynamicDic',
    fetchUrl: '/api/cascaderDynamicList',
  },
  {
    formType: 'CCascaderDynamicOption',
    isRequired: false,
    key: 'CCascaderDynamicOption',
    label: 'CCascaderDynamicOption',
    colSpan: 8,
    props: {
      cache: false,
    },
    formitemprops: {
      hasFeedback: false,
    },
    dictionaryKey: 'CascaderDynamicOptionDic',
    fetchUrl: '/api/topOption',
    initialValue: [3, 2, 3849],
    loadLeafUrls: [
      {
        cache: false,
        queryKey: 'id',
        leafZindex: 2,
        url: '/api/twoOption',
      },
      {
        cache: false,
        queryKey: 'id',
        leafZindex: 3,
        url: '/api/threeOption',
      },
    ],
  },
  {
    formType: 'CCascaderDynamicOption',
    isRequired: false,
    key: 'CCascaderDynamicOption1_2',
    label: 'CCascaderDynamicOption1_2',
    initialValue: [3, 31, 3849],
    colSpan: 8,
    props: {
      cache: false,
    },
    formitemprops: {
      hasFeedback: false,
    },
    dictionaryKey: 'CascaderDynamicOptionDic1_2',
    fetchUrl: '/api/topOption_1_2',
    loadLeafUrls: [
      {
        cache: false,
        queryKey: 'id',
        leafZindex: 3,
        url: '/api/threeOption',
      },
    ],
  },
  {
    formType: 'CSelectDynamicTree',
    isRequired: false,
    key: 'cselectDynamicTree',
    label: 'CSelectDynamicTree',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CSelectDynamicTree',
    },
    formitemprops: {
      hasFeedback: false,
    },
    dictionaryKey: 'CSelectDynamicTreeDic2',
    fetchUrl: '/sys/dept/dic',
  },
  {
    formType: 'CDatePicker',
    isRequired: false,
    key: 'datePicker',
    label: 'CDatePicker',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CDatePicker',
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CRangePicker',
    isRequired: false,
    key: 'rangePicker',
    label: 'CRangePicker',
    colSpan: 8,
    props: {
      disabled: false,
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CMonthPicker',
    isRequired: false,
    key: 'monthPicker',
    label: 'CMonthPicker',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CMonthPicker',
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CTimePicker',
    isRequired: false,
    key: 'timePicker',
    label: 'CTimePicker',
    colSpan: 8,
    props: {
      disabled: false,
      placeholder: 'CTimePicker',
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CCheckboxGroup',
    isRequired: false,
    key: 'checkboxGroup',
    label: 'CCheckboxGroup',
    colSpan: 24,
    props: {
      disabled: false,
      placeholder: 'CCheckboxGroup',
    },
    formitemprops: {
      hasFeedback: false,
    },
    selectOptions: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
      { label: 'Apple1', value: 'Apple1' },
      { label: 'Pear1', value: 'Pear1' },
      { label: 'Orange1', value: 'Orange1' },
      { label: 'Orange2', value: 'Orange3' },
    ],
  },
  {
    formType: 'CRadioGroup',
    isRequired: false,
    key: 'radioGroup',
    label: 'CRadioGroup',
    colSpan: 24,
    props: {
      disabled: false,
      placeholder: 'CRadioGroup',
    },
    formitemprops: {
      hasFeedback: false,
    },
    selectOptions: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
      { label: 'Apple1', value: 'Apple1' },
      { label: 'Pear1', value: 'Pear1' },
      { label: 'Orange1', value: 'Orange1' },
      { label: 'Orange2', value: 'Orange3' },
    ],
  },
  {
    formType: 'CTextArea',
    isRequired: false,
    key: 'textArea',
    label: 'CTextArea',
    colSpan: 24,
    props: {
      disabled: false,
      placeholder: 'CTextArea',
      autosize: { minRows: 4, maxRows: 7 },
    },
    formitemprops: {
      hasFeedback: false,
    },
  },
  {
    formType: 'CUpload',
    isRequired: false,
    key: 'upload1',
    label: 'CUpload',
    colSpan: 24,
    props: {
      disabled: false,
      placeholder: 'CUpload',
    },
    formitemprops: {
      hasFeedback: false,
    },

    action: '/sys/file/upload',
    listType: 'picture-card',
    maxFileCounts: 3,
    maxFileSize: 1,
  },
];
