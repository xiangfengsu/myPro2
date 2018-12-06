import React from 'react';
import { Tag } from 'antd';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default () => ({
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
      formType: 'CInput',
      isRequired: true,
      key: 'name',
      label: '部门名称',
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
      label: '上级部门',
      colSpan: 24,
      dictionaryKey: 'departmentStructure',
      fetchUrl: '/sys/dept/dic',
      props: {
        disabled: false,
      },
      formitemprops: {
        ...formItemLayout,
      },
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
      },
      formitemprops: {
        ...formItemLayout,
      },
      selectOptions: [
        {
          key: 1,
          value: '正常',
        },
        {
          key: 2,
          value: '删除',
        },
      ],
    },
    {
      formType: 'CInputNumber',
      isRequired: true,
      key: 'deptorder',
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
});
