import React, { Component } from 'react';
import { connect } from 'dva';

import { Cascader } from 'antd';

@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicCascaderOption extends Component {
  static getDerivedStateFromProps(nextProps) {
    // console.log('nextProps', nextProps);
    if ('value' in nextProps) {
      const { value, dictionaryKey, dictionary } = nextProps;
      return {
        selectValue: value,
        options: dictionary[dictionaryKey] || [],
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      selectValue: value,
      options: [],
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

  loadData = selectedOptions => {
    const { loadLeafUrls = [], dictionaryKey, dispatch } = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const { url, queryKey = 'id', cache } = loadLeafUrls.find(
      u => u.leafZindex === selectedOptions.length + 1
    );
    const { value } = targetOption;
    targetOption.loading = true;
    dispatch({
      type: 'dictionary/query',
      payload: {
        fetchUrl: `${url}?${queryKey}=${value}`,
        dictionaryKey: `${dictionaryKey}_${value}`,
        cache,
        cb: data => {
          targetOption.loading = false;
          targetOption.children = data;

          this.setState(prevState => {
            return {
              options: [...prevState.options],
            };
          });
        },
      },
    });
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
    const { dictionaryKey, dispatch, fetchUrl, cache, loadLeafUrls, ...restProps } = this.props;

    return (
      <Cascader
        options={state.options}
        loadData={this.loadData}
        value={state.selectValue}
        onChange={this.handleChange}
        {...restProps}
      />
    );
  }
}
export default DynamicCascaderOption;
