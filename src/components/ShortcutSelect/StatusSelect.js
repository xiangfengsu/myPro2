import React from 'react';
import { Select, Badge } from 'antd';

const { Option } = Select;
const StatusSelect = ({ text, onSelect, okText = '通过', errorText = '拒绝' }) => (
  <Select defaultValue={text} onSelect={onSelect}>
    <Option value={1}>
      <Badge status="success" text={okText} />
    </Option>
    <Option value={0}>
      <Badge status="error" text={errorText} />
    </Option>
  </Select>
);
export default StatusSelect;
