import React, { Component } from 'react';
import { connect } from 'dva';

import { Tree, Tag } from 'antd';

const { TreeNode } = Tree;
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
    // logs('changedValue', changedValue);
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
      case 3:
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
        if (menuType === 3) {
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
      const { disabled, selectable } = this.renderNodeDisabledSelectable(item.menuType);
      if (item.menuType === 1) {
        iconType = (
          <span>
            <Tag color="#f50">目录</Tag>
            {item.value}
          </span>
        );
      } else if (item.menuType === 2) {
        iconType = (
          <span>
            <Tag color="#2db7f5">菜单</Tag>
            {item.value}
          </span>
        );
      } else if (item.menuType === 3) {
        iconType = (
          <span>
            <Tag color="#108ee9">按钮</Tag>
            {item.value}
          </span>
        );
      } else {
        iconType = item.value;
      }
      if (item.children) {
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
    const { dictionary = {}, dictionaryKey, placeholder, disabled, multiple } = this.props;
    const len = dictionary[dictionaryKey] && dictionary[dictionaryKey].length;
    // logs('this.props', this.props);
    return (
      <Tree
        checkable
        disabled={disabled}
        multiple={multiple}
        defaultSelectedKeys={state.selectValue}
        defaultExpandedKeys={state.selectValue}
        placeholder={placeholder}
        style={{ width: '100%' }}
        onCheck={this.handleChange}
      >
        {len > 0 && this.renderTreeNodes(dictionary[dictionaryKey])}
      </Tree>
    );
  }
}
export default DynamicSelect;
