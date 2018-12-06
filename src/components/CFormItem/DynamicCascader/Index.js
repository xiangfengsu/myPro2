import React, { Component } from 'react';
import { connect } from 'dva';

import { Cascader } from 'antd';

@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicCascader extends Component {
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
    const { dictionary = {}, dictionaryKey, dispatch, fetchUrl, ...restProps } = this.props;
    const options = dictionary[dictionaryKey] || [];
    return (
      <Cascader
        options={options}
        value={state.selectValue}
        onChange={this.handleChange}
        {...restProps}
      />
    );
  }
}
export default DynamicCascader;
