import React, { Component } from 'react';
import { connect } from 'dva';

import { Cascader } from 'antd';

/* eslint no-param-reassign: ["error", { "props": false }] */
const setChildValue = (pdata, cData, key) => {
  return pdata.map(item => {
    if (item.value === key) {
      item.children = cData;
    } else if (item.children) {
      setChildValue(item.children, cData, key);
    }

    return { ...item };
  });
};

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
    const { fetchUrl, dictionaryKey, cache = false, value } = this.props;
    if (fetchUrl !== undefined) {
      this.fetchData({
        fetchUrl,
        dictionaryKey,
        cache,
        cb: () => {
          if (value !== undefined) {
            this.initialLoadLeafData();
          }
        },
      });
    }
  }

  fetchData = ({ fetchUrl, dictionaryKey, cache, cb }) => {
    const { dispatch = window.g_app._store.dispatch } = this.props;
    return dispatch({
      type: 'dictionary/query',
      payload: {
        fetchUrl,
        dictionaryKey,
        cache,
        cb,
      },
    });
  };

  initialLoadLeafData = async () => {
    const { loadLeafUrls = [], value = [], dictionaryKey } = this.props;
    // eslint-disable-next-line
    for (let i = 0; i < loadLeafUrls.length; i++) {
      const { leafZindex, queryKey, url, cache } = loadLeafUrls[i];
      const paramValue = value[leafZindex - 2];
      // eslint-disable-next-line
      const cData = await this.fetchData({
        fetchUrl: `${url}?${queryKey}=${paramValue}`,
        dictionaryKey: `${dictionaryKey}_${paramValue}`,
        cache,
      });
      this.setState(prevState => {
        const { options } = prevState;
        const newOption = setChildValue(options, cData, paramValue);
        return {
          options: newOption,
        };
      });
    }
  };

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
