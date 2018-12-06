import React from 'react';
import { Icon, Tag, Tooltip } from 'antd';
import Ellipsis from '@/components/Ellipsis';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default () => ({
  name: '菜单管理',
  path: 'permission/menumanage',
  tableColumns: [
    {
      title: '菜单ID',
      dataIndex: 'id',
    },
    {
      title: '菜单名称',
      dataIndex: 'menuname',
    },
    {
      title: '类型',
      dataIndex: 'menutype',
      render: text => {
        if (text === 1) {
          return <Tag color="#f50">目录</Tag>;
        }
        if (text === 2) {
          return <Tag color="#2db7f5">菜单</Tag>;
        }
        if (text === 4) {
          return <Tag color="#108ee9">按钮</Tag>;
        }
      },
    },
    {
      title: '菜单路径',
      dataIndex: 'router',
    },
    {
      title: '授权标识',
      dataIndex: 'permission',
      render: text => (
        <Ellipsis length={100} tooltip>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '排序',
      dataIndex: 'menuorder',
    },
    {
      title: '修改时间',
      dataIndex: 'updatetime',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      render: text => {
        if (text !== '') {
          return <Icon type={text} style={{ fontSize: 16, color: '#08c' }} />;
        }
        return null;
      },
    },
  ],
  detailFormItems: {
    selectFormItem: [
      {
        formType: 'CSelect',
        isRequired: true,
        initialValue: 1,
        key: 'menutype',
        label: '类型',
        colSpan: 24,
        props: {},
        formitemprops: {
          ...formItemLayout,
        },
        selectOptions: [
          {
            key: 1,
            value: '目录',
          },
          {
            key: 2,
            value: '菜单',
          },
          {
            key: 4,
            value: '按钮',
          },
        ],
      },
      {
        formType: 'CSelect',
        isRequired: true,
        initialValue: 1,
        key: 'status',
        label: '状态',
        colSpan: 24,
        props: {
          disabled: false,
          getPopupContainer: () => document.querySelector('.ant-modal-wrap'),
        },
        formitemprops: {
          ...formItemLayout,
        },
        selectOptions: [
          {
            key: 1,
            value: '通过',
          },
          {
            key: 2,
            value: '拒绝',
          },
        ],
      },
    ],
    1: [
      {
        formType: 'CInput',
        isRequired: false,
        key: 'id',
        label: 'id',
        colSpan: 0,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'menuname',
        label: '目录名称',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CSelectDynamicTree',
        isRequired: true,
        key: 'parentid',
        label: '父级目录',
        colSpan: 24,
        dictionaryKey: 'menuStructure',
        fetchUrl: '/sys/menu/dic',
        props: {
          disabled: false,
          placeholder: '请选择上级目录',
          getPopupContainer: () => document.querySelector('.ant-modal-wrap '),
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'router',
        label: '路由',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'icon',
        label: '图标',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInputNumber',
        isRequired: false,
        key: 'menuorder',
        label: '排序',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
    ],
    2: [
      {
        formType: 'CInput',
        isRequired: false,
        key: 'id',
        label: 'id',
        colSpan: 0,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'menuname',
        label: '菜单名称',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CSelectDynamicTree',
        isRequired: true,
        key: 'parentid',
        label: '父级目录',
        colSpan: 24,
        dictionaryKey: 'menuStructure',
        fetchUrl: '/sys/menu/dic',
        props: {
          disabled: false,
          placeholder: '请选择上级目录',
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'router',
        label: '路由',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'permission',
        label: '授权标识',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInputNumber',
        isRequired: false,
        key: 'menuorder',
        label: '排序',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: false,
        key: 'icon',
        label: '图标',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
          label: (
            <span>
              图标 &nbsp;
              <Tooltip key="tipIcon" title="菜单选择顶级目录时,请输入Icon">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          ),
        },
      },
    ],
    4: [
      {
        formType: 'CInput',
        isRequired: false,
        key: 'id',
        label: 'id',
        colSpan: 0,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'menuname',
        label: '按钮名称',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CSelectDynamicTree',
        isRequired: true,
        key: 'parentid',
        label: '父级菜单',
        colSpan: 24,
        dictionaryKey: 'menuStructure',
        fetchUrl: '/sys/menu/dic',
        props: {
          disabled: false,
          placeholder: '请选择上级目录',
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'permission',
        label: '授权标识',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
      {
        formType: 'CInput',
        isRequired: true,
        key: 'router',
        label: '显示标识',
        colSpan: 24,
        props: {
          disabled: false,
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
    ],

    textArea: [
      {
        formType: 'CTextArea',
        isRequired: false,
        key: 'remark',
        label: '备注',
        colSpan: 24,
        props: {
          disabled: false,
          autosize: { minRows: 5, maxRows: 10 },
        },
        formitemprops: {
          ...formItemLayout,
        },
      },
    ],
  },
});
