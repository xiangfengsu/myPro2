import React, { PureComponent } from 'react';
import { Tree, Card, Tag } from 'antd';
import { connect } from 'dva';

const { TreeNode } = Tree;
@connect(state => ({
  dictionary: state.dictionary,
}))
class Index extends PureComponent {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      return {
        selectValue: Array.isArray(value) ? value : value.checked,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      selectValue: value,
    };
  }

  handleChange = selectValue => {
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    this.triggerChange(selectValue);
  };

  triggerChange = selectValue => {
    const { onChange } = this.props;

    if (onChange) {
      if (Array.isArray(selectValue)) {
        onChange(selectValue);
      } else if ('checked' in selectValue) {
        onChange(selectValue.checked);
      }
    }
  };

  renderTreeNodes = data =>
    data.map(item => {
      let iconType = null;
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
            <Tag color="#87d068">列表</Tag>
            {item.value}
          </span>
        );
      } else if (item.menuType === 4) {
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
          <TreeNode title={iconType} value={`${item.key}`} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={iconType} value={`${item.key}`} key={item.key} dataRef={item} />;
    });

  render() {
    const { selectValue } = this.state;
    const checkedValue = Array.isArray(selectValue) ? selectValue.map(v => `${v}`) : selectValue;
    const {
      dictionary: { menuStructure = [] },
      ...restProps
    } = this.props;
    const len = menuStructure.length;
    return (
      <Card bordered={false} loading={len === 0}>
        {len > 0 ? (
          <div className="menuTreeBox">
            <Tree
              checkable
              showLine
              defaultExpandedKeys={checkedValue}
              defaultCheckedKeys={checkedValue}
              onCheck={this.handleChange}
              {...restProps}
            >
              {this.renderTreeNodes(menuStructure)}
            </Tree>
          </div>
        ) : (
          ' '
        )}
      </Card>
    );
  }
}
export default Index;
