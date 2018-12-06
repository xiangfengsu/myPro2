const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default () => ({
  name: '系统日志',
  path: 'systemlog',
  tableColumns: [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户操作',
      dataIndex: 'logtype',
    },
    {
      title: 'IP地址',
      dataIndex: 'sourceip',
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
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
      formType: 'CInput',
      isRequired: false,
      key: 'sourceip',
      label: 'IP地址',
      props: {
        disabled: false,
      },
      formitemprops: {
        ...formItemLayout,
      },
    },
  ],
});
