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
      formType: 'CInput',
      isRequired: false,
      key: 'rolename',
      label: '角色名称',
      // colSpan: 24,
      props: {
        disabled: false,
      },
      formitemprops: {
        ...formItemLayout,
      },
    },
    {
      formType: 'CSelect',
      isRequired: false,
      key: 'status',
      label: '状态',
      props: {
        disabled: false,
      },
      formitemprops: {
        ...formItemLayout,
      },
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
      key: 'rolename',
      label: '角色名称',
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
      key: 'menuids',
      label: '菜单权限',
      colSpan: 24,
      dictionaryKey: 'menuStructure',
      fetchUrl: '/sys/menu/dic',
      props: {
        disabled: false,
        multiple: true,
        showCheckedStrategy: false,
        treeCheckable: true,
        maxTagCount: 0,
        maxTagPlaceholder: '已选菜单',
        treeDefaultExpandAll: true,
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
          value: '通过',
        },
        {
          key: 2,
          value: '拒绝',
        },
      ],
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
