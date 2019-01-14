import React, { PureComponent } from 'react';

import { Form } from 'antd';

import CFormItem from '@/components/CFormItem';

const { CDynamicTree } = CFormItem;

@Form.create()
class MenuTree extends PureComponent {
  render() {
    const {
      form,
      currentItem: { menuids = [] },
      disabled,
    } = this.props;
    return (
      <CDynamicTree
        form={form}
        name="menuids"
        initialValue={menuids}
        dictionaryKey="menuStructure"
        fetchUrl="/sys/menu/dic"
        disabled={disabled}
        formitemprops={{
          label: null,
          hasFeedback: false,
        }}
        rules={[
          {
            required: true,
            message: '菜单权限不能为空',
          },
        ]}
      />
    );
  }
}
export default MenuTree;
