import React, { Component } from 'react';
import { connect } from 'dva';

import { Select } from 'antd';

import styles from './index.less';

const { Option } = Select;

function getDom(tagName, name, value) {
  const selectDom = [];
  const dom = document.getElementsByTagName(tagName);
  // eslint-disable-next-line
  for (let i = 0; i < dom.length; i++) {
    if (value === dom[i].getAttribute(name)) {
      selectDom.push(dom[i]);
    }
  }
  return selectDom;
}

@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicSelect extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      return {
        selectValue: value,
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

  componentDidMount() {
    const {
      dispatch = window.g_app._store.dispatch,
      fetchUrl,
      dictionaryKey,
      cache = false,
    } = this.props;
    if (fetchUrl !== undefined) {
      dispatch({
        type: 'dictionary/query',
        payload: {
          fetchUrl,
          dictionaryKey,
          cache,
        },
      });
    }
  }

  handleLetterClick = key => {
    const itemComponent = getDom('div', 'title', key)[0].parentNode;
    if (!itemComponent) return;
    itemComponent.parentNode.scrollTop = itemComponent.offsetTop;
  };

  dropdownRender = menuNode => {
    const { dictionary = {}, dictionaryKey, hasIndexes } = this.props;
    const dicList = dictionary[dictionaryKey] || [];
    const letterList = dicList.map(item => item.key);

    if (!hasIndexes) return menuNode;

    return (
      <div className={styles.modelBox}>
        <div className={styles.letterBox}>
          {letterList.map(lett => (
            <span key={lett} onClick={() => this.handleLetterClick(lett)}>
              {lett}
            </span>
          ))}
        </div>
        <div style={{ display: 'inline-block', width: '80%' }}>{menuNode}</div>
      </div>
    );
  };

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

  render() {
    const { state } = this;
    const { dictionary = {}, dictionaryKey, hasIndexes, ...restProps } = this.props;

    return (
      <div
        onMouseDown={e => {
          e.preventDefault();
          return false;
        }}
      >
        <Select
          value={state.selectValue}
          onChange={this.handleChange}
          dropdownRender={this.dropdownRender}
          className={styles.modelSelectBox}
          {...restProps}
        >
          {dictionary[dictionaryKey] &&
            dictionary[dictionaryKey].map(option => (
              <Select.OptGroup label={option.label} key={option.key}>
                {option.childrenOptions.map(v => (
                  <Option value={v.key} key={v.key}>
                    {v.value}
                  </Option>
                ))}
              </Select.OptGroup>
            ))}
        </Select>
      </div>
    );
  }
}
export default DynamicSelect;
