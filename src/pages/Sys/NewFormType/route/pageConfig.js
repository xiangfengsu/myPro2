export const FormItems = [
  {
    formType: 'input',
    initialValue: '123',
    disabled: false,
    isRequired: false,
    key: 'channelname',
    label: 'input',
    colSpan: 8,
    placeholder: 'input',
    hasFeedback: true,
    props: {
      // size: 'large',
      placeholder: 'admin',
    },
  },
  {
    formType: 'inputNumber',
    disabled: false,
    isRequired: false,
    key: 'inputNumber',
    label: 'inputNumber',
    placeholder: 'inputNumber',
    colSpan: 8,
    hasFeedback: true,
  },
  {
    formType: 'inputMoney',
    disabled: false,
    isRequired: false,
    key: 'inputMoney',
    label: 'inputMoney',
    placeholder: 'inputMoney',
    colSpan: 8,
    hasFeedback: true,
  },
  {
    formType: 'inputPhone',
    disabled: false,
    isRequired: false,
    key: 'inputPhone',
    label: 'inputPhone',
    placeholder: 'inputPhone',
    colSpan: 8,
    hasFeedback: true,
  },
  {
    formType: 'cascader',
    initialValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    disabled: false,
    isRequired: false,
    key: 'cascader',
    label: 'cascader',
    placeholder: '省/市/区',
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
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
    colSpan: 8,
    hasFeedback: true,
  },
  {
    formType: 'cascaderDynamic',
    disabled: false,
    isRequired: false,
    multiple: true,
    key: 'cascaderDynamic',
    label: 'cascaderDynamic',
    placeholder: '省/市/区',
    dictionaryKey: 'cascaderDynamic',
    fetchUrl: '/api/cascaderDynamicList',
    cache: false,
    hasFeedback: true,
  },
  {
    formType: 'select',
    disabled: false,
    isRequired: false,
    key: 'select',
    label: 'select',
    placeholder: 'select',
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
    popupContainer: 'scorllArea',
    hasFeedback: true,
  },
  {
    formType: 'select',
    disabled: false,
    isRequired: false,
    multiple: true,
    key: 'selectMultiple',
    label: 'selectMultiple',
    placeholder: 'selectMultiple',
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
    popupContainer: 'scorllArea',
    hasFeedback: true,
  },
  {
    formType: 'selectDynamic',
    disabled: false,
    isRequired: false,
    multiple: true,
    key: 'selectMultipleDynamic',
    label: 'selectMultipleDynamic',
    placeholder: 'selectMultipleDynamic',
    dictionaryKey: 'selectMultipleDynamic',
    fetchUrl: '/api/selectLists2',
    // initialValue: '其他',
    popupContainer: 'scorllArea',
    hasFeedback: true,
  },
  {
    formType: 'selectDynamic',
    disabled: false,
    isRequired: false,
    key: 'selectDynamic',
    label: 'selectDynamic',
    placeholder: 'selectDynamic',
    dictionaryKey: 'selectDynamic1',
    fetchUrl: '/api/selectLists2',
    isCheckFirst: false,
    // initialValue: '其他',
    popupContainer: 'scorllArea',
    hasFeedback: true,
  },
  {
    formType: 'inputDynamic',
    // initialValue: 'vvvv',
    isReadOnly: true,
    disabled: false,
    isRequired: false,
    key: 'inputDynamicText',
    label: 'inputDynamicText',
    colSpan: 8,
    // placeholder: 'input',
    dictionaryKey: 'inputDynamicText',
    // fetchUrl: '/api/dynamictext',
    hasFeedback: true,
    props: {
      // size: 'large',
      placeholder: 'admin',
    },
  },
  {
    formType: 'selectDynamic',
    disabled: false,
    isRequired: false,
    key: 'selectDynamicLinkageParent',
    label: '下拉联动Parent',
    placeholder: 'selectDynamic',
    dictionaryKey: 'selectDynamicLinkageParent',
    fetchUrl: '/api/selectLists2',
    isCheckFirst: false,
    // initialValue: '其他',
    popupContainer: 'scorllArea',
    hasFeedback: true,
    props: {
      onChange: ({ dispatch, changedValue, form }) => {
        form.setFieldsValue({
          selectDynamicLinkageChild: undefined,
          inputDynamicText: undefined,
        });
        dispatch({
          type: 'dictionary/query',
          payload: {
            fetchUrl: `/api/linkage?${changedValue}`,
            dictionaryKey: 'selectDynamicLinkageChild',
          },
        });

        dispatch({
          type: 'dictionary/query',
          payload: {
            fetchUrl: `/api/dynamictext?${changedValue}`,
            dictionaryKey: 'inputDynamicText',
          },
        });
      },
    },
  },
  {
    formType: 'selectDynamic',
    disabled: false,
    isRequired: false,
    key: 'selectDynamicLinkageChild',
    label: '下拉联动Child',
    placeholder: 'selectDynamic',
    dictionaryKey: 'selectDynamicLinkageChild',
    isCheckFirst: false,
    popupContainer: 'scorllArea',
    hasFeedback: true,
  },
  {
    formType: 'selectGroup',
    key: 'selectGroup',

    label: 'selectGroup',
    placeholder: 'selectGroup',
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
    popupContainer: 'scorllArea',
    hasFeedback: true,
  },
  {
    formType: 'selectDynamicGroup',
    multiple: true,
    disabled: false,
    isRequired: false,
    key: 'selectGroupDynamic',
    label: 'selectGroupDynamic',
    placeholder: 'selectDynamic',
    dictionaryKey: 'selectGroupDynamic',
    fetchUrl: '/api/selectGroupLists',
    // initialValue: '其他',
    popupContainer: 'scorllArea',
    hasFeedback: true,
  },
  {
    formType: 'datePicker',
    showTime: false,

    disabled: false,
    isRequired: false,
    key: 'datePicker',
    label: 'datePicker',
    placeholder: 'datePicker',
    popupContainer: 'scorllArea',
  },
  {
    formType: 'datePicker',
    showTime: true,
    disabled: false,
    isRequired: false,
    key: 'datePickerShowTime',
    label: 'datePickerShowTime',
    placeholder: 'datePicker',
    popupContainer: 'scorllArea',
  },
  {
    formType: 'rangePicker',
    disabled: false,
    isRequired: false,
    key: 'rangePicker',
    label: 'rangePicker',
    popupContainer: 'scorllArea',
  },
  {
    formType: 'rangePicker',
    showTime: true,
    disabled: false,
    isRequired: false,
    key: 'rangePickerShowTime',
    label: 'rangePickerShowTime',
    popupContainer: 'scorllArea',
  },
  {
    formType: 'monthPicker',
    disabled: false,
    isRequired: false,
    key: 'monthPicker',
    label: 'monthPicker',
    popupContainer: 'scorllArea',
  },
  {
    formType: 'timePicker',
    disabled: false,
    isRequired: false,
    key: 'timePicker',
    label: 'timePicker',
    popupContainer: 'scorllArea',
  },

  {
    formType: 'checkboxGroup',
    disabled: false,
    isRequired: false,
    itemColSpan: 4,
    options: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
      { label: 'Apple1', value: 'Apple1' },
      { label: 'Pear1', value: 'Pear1' },
      { label: 'Orange1', value: 'Orange1' },
      { label: 'Orange2', value: 'Orange3' },
    ],
    key: 'checkbox',
    label: 'checkbox',
    colSpan: 24,
    // popupContainer: 'scorllArea'
  },
  {
    formType: 'radioGroup',
    disabled: false,
    isRequired: false,
    itemColSpan: 4,
    options: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
      { label: 'Apple1', value: 'Apple1' },
      { label: 'Pear1', value: 'Pear1' },
      { label: 'Orange1', value: 'Orange1' },
      { label: 'Orange2', value: 'Orange3' },
    ],
    key: 'radioGroup',
    label: 'radioGroup',
    colSpan: 24,
    // popupContainer: 'scorllArea'
  },
  {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'upload1',
    label: 'upload-listType-text',
    placeholder: 'upload1',
    action: '/sys/file/upload',
    multiple: true,
    acceptType: '*', // .jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'text', // 1:text  2:picture 3:picture-card
    maxFileSize: 10, // 单位是M
    maxFileCounts: 3,
    colSpan: 24,
  },
  {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'upload3',
    label: 'upload-listType-picture',
    placeholder: 'upload-listType-picture',
    action: '/sys/file/upload',
    multiple: true,
    acceptType: '*', // .jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture', // 1:text  2:picture 3:picture-card
    maxFileSize: 10, // 单位是M
    maxFileCounts: 3,
    colSpan: 24,
  },
  {
    formType: 'upload',
    disabled: false,
    isRequired: false,
    key: 'upload2',
    label: 'upload-listType-picture-card',
    placeholder: 'upload-listType-picture-card',
    action: '/sys/file/upload',
    multiple: true,
    acceptType: '*', // .jpg,.png,.pdf,.mp4,.gif,.word
    listType: 'picture-card', // 1:text  2:picture 3:picture-card
    maxFileSize: 10, // 单位是M
    maxFileCounts: 5,
    initialValue: [
      {
        uid: -1, // 不能为空
        name: 'xxx.png',
        status: 'done', // 不能为空
        url: 'http://dummyimage.com/1000x1000/f2b079/FFF&text=@word.jpg', // 不能为空
        thumbUrl: 'http://dummyimage.com/1000x1000/f2b079/FFF&text=@word.jpg', // 不能为空  值同url
      },
      {
        uid: -2, // 不能为空
        name: 'xxx.png',
        status: 'done', // 不能为空
        url: 'http://dummyimage.com/1000x1000/8d79f2/FFF&text=@word.jpg', // 不能为空
        thumbUrl: 'http://dummyimage.com/1000x1000/8d79f2/FFF&text=@word.jpg', // 不能为空  值同url
      },
    ],
    colSpan: 24,
  },
  {
    formType: 'textArea',
    // disabled: false,
    // isRequired: false,
    key: 'textArea',
    label: 'textArea',
    colSpan: 24,
    // autosize: { minRows: 3, maxRows: 7 }
    // placeholder: 'inputPhone'
  },
];
