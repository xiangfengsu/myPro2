import React, { Component } from 'react';
import { connect } from 'dva';

import { TreeSelect, Tag } from 'antd';

const { TreeNode } = TreeSelect;
const { SHOW_PARENT, SHOW_CHILD } = TreeSelect;
@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicSelect extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      return {
        selectValue: value === undefined ? undefined : `${value}`.split(','),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      selectValue: value === undefined ? undefined : `${value}`.split(','),
    };
  }

  componentDidMount() {
    const { dispatch, dictionaryKey, fetchUrl } = this.props;
    dispatch({
      type: 'dictionary/query',
      payload: {
        fetchUrl,
        dictionaryKey,
      },
    });
  }

  handleChange = selectValue => {
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    this.triggerChange(selectValue);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  renderNodeDisabledSelectable = (menuType = 0) => {
    const {
      extraProp: { selectMenuTypeValue = 0 },
    } = this.props;
    const obj = {};
    switch (selectMenuTypeValue) {
      case 1:
      case 2:
        if (menuType === 1) {
          Object.assign(obj, {
            disabled: false,
            selectable: true,
          });
        } else {
          Object.assign(obj, {
            disabled: true,
            selectable: false,
          });
        }
        break;
      case 4:
        if (menuType === 1) {
          Object.assign(obj, {
            disabled: false,
            selectable: false,
          });
        }
        if (menuType === 2) {
          Object.assign(obj, {
            disabled: false,
            selectable: true,
          });
        }
        if (menuType === 4) {
          Object.assign(obj, {
            disabled: true,
            selectable: false,
          });
        }
        break;
      default:
        Object.assign(obj, {
          disabled: false,
          selectable: true,
        });
        break;
    }
    return obj;
  };

  renderTreeNodes = data =>
    data.map(item => {
      let iconType = null;
      const { menutype } = item;
      const { disabled, selectable } = this.renderNodeDisabledSelectable(menutype);
      if (menutype === 1) {
        iconType = (
          <span>
            <Tag color="#f50">目录</Tag>
            {item.value}
          </span>
        );
      } else if (menutype === 2) {
        iconType = (
          <span>
            <Tag color="#2db7f5">菜单</Tag>
            {item.value}
          </span>
        );
      } else if (menutype === 3) {
        iconType = (
          <span>
            <Tag color="#87d068">列表</Tag>
            {item.value}
          </span>
        );
      } else if (menutype === 4) {
        iconType = (
          <span>
            <Tag color="#108ee9">按钮</Tag>
            {item.value}
          </span>
        );
      } else {
        iconType = item.value;
      }
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode
            title={iconType}
            value={`${item.key}`}
            key={item.key}
            dataRef={item}
            disabled={disabled}
            selectable={selectable}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={iconType}
          value={`${item.key}`}
          key={item.key}
          dataRef={item}
          disabled={disabled}
          selectable={selectable}
        />
      );
    });

  render() {
    const { state } = this;
    const {
      dictionary = {},
      dictionaryKey,
      placeholder,
      disabled,
      multiple,
      showCheckedStrategy,
    } = this.props;
    const len = dictionary[dictionaryKey] && dictionary[dictionaryKey].length;
    return (
      <TreeSelect
        value={state.selectValue}
        // treeCheckStrictly={true}
        treeCheckable={multiple}
        placeholder={placeholder}
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        onChange={this.handleChange}
        disabled={disabled}
        showCheckedStrategy={showCheckedStrategy ? SHOW_PARENT : SHOW_CHILD}
      >
        {len > 0 && this.renderTreeNodes(dictionary[dictionaryKey])}
      </TreeSelect>
    );
  }
}
export default DynamicSelect;
