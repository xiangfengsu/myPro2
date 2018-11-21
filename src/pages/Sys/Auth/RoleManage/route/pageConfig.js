import React from 'react';
import { Tag } from 'antd';

export const PageConfig = {
  name: '角色管理',
  path: 'permission/rolemanage',
  tableColumns: [
    {
      title: '角色ID',
      dataIndex: 'id',
    },
    {
      title: '角色ID',
      dataIndex: 'menuids',
      colSpan: 0,
      render: text => ({
          children: <a href="#">{text}</a>,
          props: {
            colSpan: 0,
          },
        }),
    },
    {
      title: '角色名称',
      dataIndex: 'rolename',
    },
    {
      title: '修改时间',
      dataIndex: 'updatetime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => {
        if (text === 1) {
          return <Tag color="#52c41a">通过</Tag>;
        } 
          return <Tag color="#f5222d">拒绝</Tag>;
        
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ],
  searchForms: [
    {
      formType: 'input',
      disabled: false,
      isRequired: false,
      key: 'rolename',
      label: '角色名称',
    },
    {
      formType: 'select',
      disabled: false,
      isRequired: false,
      key: 'status',
      label: '状态',
      placeholder: '状态',
      dataType: 'static',
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
    },
  ],
  detailFormItems: [
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
      key: 'rolename',
      label: '角色名称',
      colSpan: 24,
    },
    {
      formType: 'selectDynamicTree', // selectDynamicTree
      disabled: false,
      isRequired: true,
      key: 'menuids',
      label: '菜单权限',
      dictionaryKey: 'menuStructure',
      fetchUrl: '/sys/menu/dic',
      multiple: true,
      showCheckedStrategy: false,
      hasFeedback: true,
      colSpan: 24,
    },
    {
      formType: 'select',
      initialValue: 1,
      disabled: false,
      isRequired: true,
      key: 'status',
      label: '状态',
      placeholder: '状态',
      dataType: 'static',
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
};
