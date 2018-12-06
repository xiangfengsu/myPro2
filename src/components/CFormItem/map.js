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
import UploadImg from './UploadImg/Index';
import DynamicSelectTree from './DynamicSelectTree/Index';

const { MonthPicker, RangePicker } = DatePicker;

export default {
  CInput: {
    component: Input,
    formitemprops: {},
    props: {},
    rules: [],
  },
  CInputNumber: {
    component: InputNumber,
    formItemProps: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
  },
  CInputMoney: {
    component: Input,
    formitemprops: {},
    props: {},
    rules: [],
  },
  CInputPhone: {
    component: Input,
    formitemprops: {},
    props: {
      maxLength: 11,
    },
    rules: [],
  },
  CSelect: {
    component: Select,
    formitemprops: {},
    props: {},
    rules: [],
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
    options: [],
  },
  CSelectDynamic: {
    component: DynamicSelect,
    formitemprops: {},
    props: {},
    rules: [],
    dictionaryKey: 'CSelectDynamicDic',
    fetchUrl: '/api/selectLists2',
    cache: false,
  },
  CSelectGroupDynamic: {
    component: DynamicSelectGroup,
    formitemprops: {},
    props: {},
    rules: [],
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
    dictionaryKey: 'CCascaderDynamicDic',
    fetchUrl: '/api/cascaderDynamicList',
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
    dictionaryKey: 'CSelectDynamicDic',
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
  },
  CRangePicker: {
    component: RangePicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
  },
  CMonthPicker: {
    component: MonthPicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
  },
  CTimePicker: {
    component: TimePicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
  },
  CCheckboxGroup: {
    component: Checkbox,
    formitemprops: {},
    props: {
      style: { width: '100%', lineHeight: 'unset' },
    },
    rules: [],
    itemColSpan: 6,
    selectOptions: [],
  },
  CRadioGroup: {
    component: Radio,
    formitemprops: {},
    props: {
      style: { width: '100%', lineHeight: 'unset' },
    },
    rules: [],
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
  },
  CUpload: {
    component: UploadImg,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
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
