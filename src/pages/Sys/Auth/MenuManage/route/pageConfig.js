import React from 'react';
import { Icon, Tag } from 'antd';
import Ellipsis from '@/components/Ellipsis';

export const PageConfig = {
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
        } if (text === 2) {
          return <Tag color="#2db7f5">菜单</Tag>;
        } if (text === 4) {
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
        formType: 'select',
        disabled: false,
        isRequired: true,
        key: 'menutype',
        label: '类型',
        initialValue: 1,
        selectOptions: [
          {
            key: '1',
            value: '目录',
          },
          {
            key: '2',
            value: '菜单',
          },
          {
            key: '4',
            value: '按钮',
          },
        ],
        hasFeedback: true,
        colSpan: 24,
      },
      {
        formType: 'select',
        disabled: false,
        isRequired: false,
        key: 'status',
        label: '状态',
        placeholder: '状态',
        dataType: 'static',
        initialValue: 1,
        selectOptions: [
          {
            key: '1',
            value: '通过',
          },
          {
            key: '2',
            value: '拒绝',
          },
        ],
        colSpan: 24,
      },
    ],
    1: [
      {
        formType: 'input',
        disabled: false,
        isRequired: false,
        key: 'id',
        label: 'id',
        colSpan: 0,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'menuname',
        label: '目录名称',
        colSpan: 24,
      },
      {
        formType: 'selectDynamicTree',
        disabled: false,
        isRequired: true,
        key: 'parentid',
        label: '父级目录',
        placeholder: '请选择上级目录',
        dictionaryKey: 'menuStructure',
        fetchUrl: '/sys/menu/dic',
        multiple: false,
        hasFeedback: true,
        colSpan: 24,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'router',
        label: '路由',
        colSpan: 24,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'icon',
        label: '图标',
        colSpan: 24,
      },
      {
        formType: 'inputNumber',
        disabled: false,
        isRequired: false,
        key: 'menuorder',
        label: '排序',
        placeholder: '排序',
        colSpan: 24,
      },
    ],
    2: [
      {
        formType: 'input',
        disabled: false,
        isRequired: false,
        key: 'id',
        label: 'id',
        colSpan: 0,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'menuname',
        label: '菜单名称',
        colSpan: 24,
      },
      {
        formType: 'selectDynamicTree',
        disabled: false,
        isRequired: true,
        key: 'parentid',
        label: '父级菜单',
        placeholder: '请选择上级目录',
        dictionaryKey: 'menuStructure',
        fetchUrl: '/sys/menu/dic',
        hasFeedback: true,
        colSpan: 24,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'router',
        label: '菜单路由',
        colSpan: 24,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'permission',
        label: '授权标识',
        colSpan: 24,
      },
      {
        formType: 'inputNumber',
        disabled: false,
        isRequired: false,
        key: 'menuorder',
        label: '菜单顺序',
        placeholder: '菜单顺序',
        colSpan: 24,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: false,
        key: 'icon',
        label: '图标',
        tooltip: '菜单选择顶级目录时,请输入Icon',
        colSpan: 24,
      },
    ],
    4: [
      {
        formType: 'input',
        disabled: false,
        isRequired: false,
        key: 'id',
        label: 'id',
        colSpan: 0,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'menuname',
        label: '按钮名称',
        colSpan: 24,
      },
      {
        formType: 'selectDynamicTree',
        disabled: false,
        isRequired: true,
        key: 'parentid',
        label: '父级菜单',
        dictionaryKey: 'menuStructure',
        fetchUrl: '/sys/menu/dic',
        hasFeedback: true,
        colSpan: 24,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'permission',
        label: '授权标识',
        colSpan: 24,
      },
      {
        formType: 'input',
        disabled: false,
        isRequired: true,
        key: 'router',
        label: '显示标识',
        colSpan: 24,
      },
    ],

    textArea: [
      {
        formType: 'textArea',
        disabled: false,
        isRequired: false,
        key: 'remark',
        label: '备注',
        placeholder: '备注',
        autosize: { minRows: 5, maxRows: 10 },
        colSpan: 24,
      },
    ],
  },
};
