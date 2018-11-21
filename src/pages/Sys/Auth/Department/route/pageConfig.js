import React from 'react';
import { Tag } from 'antd';

export const PageConfig = {
  name: '部门管理',
  path: 'permission/department',
  apiList: {
    saveInfo: '/dept/save',
    updateInfo: '/dept/update',
    deleteInfo: '/dept/del',
    queryInfo: '/dept/tree',
  },
  tableColumns: [
    {
      title: '部门ID',
      dataIndex: 'key',
    },
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '排序',
      dataIndex: 'deptorder',
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
          return <Tag color="#52c41a">正常</Tag>;
        }
          return <Tag color="#f5222d">删除</Tag>;

      },
    },
  ],
  detailFormItems: [
    {
      formType: 'input',
      disabled: false,
      isRequired: true,
      key: 'name',
      label: '部门名称',
      placeholder: '部门名称',
      colSpan: 24,
    },
    {
      formType: 'selectDynamicTree',
      disabled: false,
      isRequired: true,
      key: 'parentid',
      label: '上级部门',
      dictionaryKey: 'departmentStructure',
      fetchUrl: '/sys/dept/dic',
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
          value: '正常',
        },
        {
          key: '2',
          value: '删除',
        },
      ],
      colSpan: 24,
    },
    {
      formType: 'inputNumber',
      disabled: false,
      isRequired: false,
      key: 'deptorder',
      label: '排序',
      placeholder: '排序',
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
