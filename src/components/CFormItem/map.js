import {
  Input,
  InputNumber,
  Select,
  Cascader,
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
} from 'antd';
import DynamicSelect from './DynamicSelect/Index';
import DynamicSelectGroup from './DynamicSelectGroup/Index';
import DynamicCascader from './DynamicCascader/Index';
import DynamicCascaderOption from './DynamicCascaderOption/Index';
import UploadImg from './UploadImg/Index';
import DynamicSelectTree from './DynamicSelectTree/Index';
import DynamicTree from './DynamicTree/Index';
import CheckboxGroupImage from './CheckBoxGroupImage/Index';

const { MonthPicker, RangePicker } = DatePicker;

export default {
  CInput: {
    component: Input,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
  },
  CInputNumber: {
    component: InputNumber,
    formItemProps: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CInputMoney: {
    component: Input,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
  },
  CInputPhone: {
    component: Input,
    formitemprops: {},
    props: {
      maxLength: 11,
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CSelect: {
    component: Select,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
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
  CSelectGroup: {
    component: Select,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
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
  CCascader: {
    component: Cascader,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    options: [],
  },

  CSelectDynamic: {
    component: DynamicSelect,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    dictionaryKey: 'CSelectDynamicDic',
    fetchUrl: '/api/selectLists2',
    cache: false,
  },
  CSelectGroupDynamic: {
    component: DynamicSelectGroup,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    dictionaryKey: 'CSelectGroupDynamicDic',
    fetchUrl: '/api/selectGroupLists',
    cache: false,
  },
  CCascaderDynamic: {
    component: DynamicCascader,
    formitemprops: {},
    props: {
      // style:{width:'96%'}
    },
    rules: [],
    fieldDecoratorOptions: {},
    dictionaryKey: 'CCascaderDynamicDic',
    fetchUrl: '/api/cascaderDynamicList',
    cache: false,
  },
  CCascaderDynamicOption: {
    component: DynamicCascaderOption,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    dictionaryKey: 'CCascaderDynamicOptionDic',
    fetchUrl: '/api/cascaderDynamicList',
    loadLeafUrls: [
      {
        cache: false,
        queryKey: 'sid',
        leafZindex: 2,
        url: '/api/index/getModel',
      },
    ],
    cache: false,
  },
  CSelectDynamicTree: {
    component: DynamicSelectTree,
    formitemprops: {},
    props: {
      style: { width: '100%' },
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
    },
    rules: [],
    fieldDecoratorOptions: {},
    dictionaryKey: 'CSelectDynamicDic',
    fetchUrl: '/api/selectLists2',
    cache: false,
  },
  CDynamicTree: {
    component: DynamicTree,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    dictionaryKey: 'CDynamicTreeDic',
    fetchUrl: '/api/selectLists2',
    cache: false,
  },
  CDatePicker: {
    component: DatePicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CRangePicker: {
    component: RangePicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CMonthPicker: {
    component: MonthPicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CTimePicker: {
    component: TimePicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CCheckboxGroup: {
    component: Checkbox,
    formitemprops: {},
    props: {
      style: { width: '100%', lineHeight: 'unset' },
    },
    rules: [],
    fieldDecoratorOptions: {},
    itemColSpan: 6,
    selectOptions: [],
  },
  CCheckboxGroupImage: {
    component: CheckboxGroupImage,
    formitemprops: {},
    props: {
      style: { width: '100%', lineHeight: 'unset' },
    },
    rules: [],
    fieldDecoratorOptions: {},
    itemColSpan: 6,
  },
  CRadioGroup: {
    component: Radio,
    formitemprops: {},
    props: {
      style: { width: '100%', lineHeight: 'unset' },
    },
    rules: [],
    fieldDecoratorOptions: {},
    itemColSpan: 6,
    selectOptions: [],
  },
  CTextArea: {
    component: Input.TextArea,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CUpload: {
    component: UploadImg,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
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
  },
};
