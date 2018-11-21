import React, { PureComponent } from 'react';
import { Tree, Card, Tag } from 'antd';

const { TreeNode } = Tree;

export default class Index extends PureComponent {
  renderTreeNodes = data => data.map(item => {
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
    const {
      dictionary: { menuStructure = [] },
      currentItem: { menuids = '' },
    } = this.props;
    const parentdepartmentids = Array.isArray(menuids)
      ? menuids.join(',').split(',')
      : menuids.split(',');
    const len = menuStructure.length;
    // console.log('parentdepartmentids', parentdepartmentids);
    return (
      <Card bordered={false} loading={len === 0} style={{ pointerEvents: 'none' }}>
        {len > 0 ? (
          <div className="menuTreeBox">
            <Tree
              showLine
              checkable
              defaultExpandedKeys={parentdepartmentids}
              defaultCheckedKeys={parentdepartmentids}
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
