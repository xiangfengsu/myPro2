import React, { PureComponent } from 'react';
import { Table } from 'antd';

export default class Index extends PureComponent {
  render() {
    const { loading, dataSource, columns } = this.props;
    return <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} />;
  }
}
