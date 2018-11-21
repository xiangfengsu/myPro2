import React from 'react';
import { Tag } from 'antd';

export const PageConfig = {
  name: '用户管理',
  path: 'usermanage',
  tableColumns: [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 50,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      fixed: 'left',
      width: 180,
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (text, record) => record.sysRoleList.map(v => (
        <Tag color="cyan" key={v.id}>
          {v.rolename}
        </Tag>
          )),
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '所属部门',
      dataIndex: 'sysDept.name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
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
      fixed: 'right',
      width: 60,
    },
  ],
  searchForms: [
    {
      formType: 'input',
      disabled: false,
      isRequired: false,
      key: 'username',
      label: '用户名',
    },
    {
      formType: 'inputPhone',
      disabled: false,
      isRequired: false,
      key: 'mobile',
      label: '手机号',
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
      key: 'nickname',
      label: '昵称',
      colSpan: 24,
    },
    {
      formType: 'input',
      disabled: false,
      isRequired: true,
      key: 'username',
      label: '登录名',
      colSpan: 24,
    },
    {
      formType: 'input',
      disabled: false,
      isRequired: true,
      key: 'password',
      label: '密码',
      colSpan: 24,
    },
    {
      formType: 'selectDynamic',
      disabled: false,
      isRequired: true,
      multiple: true,
      key: 'roleids',
      label: '角色',
      placeholder: '请选择角色',
      dictionaryKey: 'roleDictionary',
      fetchUrl: '/sys/role/dic',
      hasFeedback: true,
      colSpan: 24,
    },
    {
      formType: 'selectDynamicTree',
      disabled: false,
      isRequired: true,
      key: 'deptid', //  departmentid
      label: '所属部门',
      dictionaryKey: 'departmentStructure',
      fetchUrl: '/sys/dept/dic',
      hasFeedback: true,
      colSpan: 24,
    },
    {
      formType: 'inputPhone',
      disabled: false,
      isRequired: true,
      key: 'mobile',
      label: '手机号',
      colSpan: 24,
    },
    {
      formType: 'inputMail',
      isRequired: true,
      key: 'email',
      label: '邮箱',
      colSpan: 24,
    },
    {
      formType: 'select',
      disabled: false,
      isRequired: true,
      initialValue: 1,
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
