import React, { Component } from 'react';
import { connect } from 'dva';

import { Select } from 'antd';

const { Option } = Select;

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
    const { dictionary = {}, dictionaryKey, ...restProps } = this.props;
    return (
      <Select value={state.selectValue} onChange={this.handleChange} {...restProps}>
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
    );
  }
}
export default DynamicSelect;
