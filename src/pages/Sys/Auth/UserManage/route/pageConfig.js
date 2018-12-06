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
      render: (text, record) =>
        record.sysRoleList.map(v => (
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
      formType: 'CInput',
      isRequired: false,
      key: 'username',
      label: '用户名',
      props: {
        disabled: false,
      },
      formitemprops: {
        ...formItemLayout,
      },
    },
    {
      formType: 'CInputPhone',
      isRequired: false,
      key: 'mobile',
      label: '手机号',
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
      key: 'nickname',
      label: '昵称',
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
      key: 'username',
      label: '登录名',
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
      key: 'password',
      label: '密码',
      colSpan: 24,
      props: {
        disabled: false,
      },
      formitemprops: {
        ...formItemLayout,
      },
    },
    {
      formType: 'CSelectDynamic',
      isRequired: true,
      key: 'roleids',
      label: '角色',
      colSpan: 24,
      props: {
        disabled: false,
        mode: 'multiple',
        getPopupContainer: () => document.querySelector('.ant-modal-wrap '),
      },
      formitemprops: {
        ...formItemLayout,
      },
      dictionaryKey: 'roleDictionary',
      fetchUrl: '/sys/role/dic',
    },

    {
      formType: 'CSelectDynamicTree',
      isRequired: true,
      key: 'deptid',
      label: '所属部门',
      colSpan: 24,
      dictionaryKey: 'departmentStructure',
      fetchUrl: '/sys/dept/dic',
      props: {
        disabled: false,
        getPopupContainer: () => document.querySelector('.ant-modal-wrap '),
      },
      formitemprops: {
        ...formItemLayout,
      },
    },

    {
      formType: 'CInputPhone',
      isRequired: true,
      key: 'mobile',
      label: '手机号',
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
      key: 'email',
      label: '邮箱',
      colSpan: 24,
      props: {
        disabled: false,
      },
      formitemprops: {
        ...formItemLayout,
      },
      rules: [
        {
          pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
          message: ' 邮箱格式不正确',
        },
      ],
    },

    {
      formType: 'CSelect',
      isRequired: true,
      key: 'status',
      label: '状态',
      initialValue: 1,
      colSpan: 24,
      props: {
        disabled: false,
        getPopupContainer: () => document.querySelector('.ant-modal-wrap '),
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
