export const PageConfig = {
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
      formType: 'input',
      disabled: false,
      isRequired: false,
      key: 'username',
      label: '用户名',
    },
    {
      formType: 'input',
      disabled: false,
      isRequired: false,
      key: 'sourceip',
      label: 'IP地址',
    },
  ],
  detailFormItems: [
    {
      formType: 'input',
      disabled: false,
      isRequired: true,
      key: 'channelname',
      label: '渠道名称',
      placeholder: '渠道名称',
      colSpan: 24,
    },
    {
      formType: 'select',
      disabled: false,
      isRequired: true,
      key: 'cooperationstatus',
      label: '合作状态',
      placeholder: '合作状态',
      dataType: 'static',
      selectOptions: [
        {
          key: '直营',
          value: '直营',
        },
        {
          key: '小商户',
          value: '小商户',
        },
      ],
      colSpan: 24,
    },
    {
      formType: 'select',
      disabled: false,
      isRequired: true,
      key: 'channeltype',
      label: '渠道类型',
      placeholder: '渠道类型',
      dataType: 'static',
      selectOptions: [
        {
          key: '广告',
          value: '广告',
        },
        {
          key: '网络',
          value: '网络',
        },
        {
          key: '中介',
          value: '中介',
        },
        {
          key: '其他',
          value: '其他',
        },
      ],
      colSpan: 24,
    },
    {
      formType: 'select',
      disabled: false,
      isRequired: true,
      key: 'channelsource',
      label: '渠道来源',
      placeholder: '渠道来源',
      dataType: 'static',
      selectOptions: [
        {
          key: '官网',
          value: '官网',
        },
        {
          key: '百度',
          value: '百度',
        },
        {
          key: '400介绍',
          value: '400介绍',
        },
        {
          key: '老客户',
          value: '老客户',
        },
      ],
      colSpan: 24,
    },
    {
      formType: 'select',
      disabled: false,
      isRequired: true,
      key: 'channelnature',
      label: '渠道性质',
      placeholder: '渠道性质',
      dataType: 'static',
      selectOptions: [
        {
          key: 0,
          value: '直营',
        },
        {
          key: 1,
          value: '非直营',
        },
      ],
      colSpan: 24,
    },
    {
      formType: 'select',
      disabled: false,
      isRequired: true,
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
          key: 0,
          value: '拒绝',
        },
      ],
      colSpan: 24,
    },
    {
      formType: 'textArea',
      disabled: false,
      isRequired: true,
      key: 'description',
      label: '备注',
      placeholder: '备注',
      autosize: { minRows: 5, maxRows: 10 },
      colSpan: 24,
    },
  ],
};
