import React, { Component } from 'react';
import { connect } from 'dva';

import { Cascader } from 'antd';

const cleanArray = arr => {
  if (!(arr instanceof Array)) {
    arr = []; /* eslint-disable-line */
  }
  return arr.filter(e => e !== undefined && e !== null && e !== '');
};
@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicCascader extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      const { value, multiple } = nextProps;
      if (value !== undefined) {
        const arrValue = Array.isArray(value) ? value : `${value}`.split(',');
        return {
          selectValue: multiple ? (arrValue === '' ? undefined : arrValue) : value,
        };
      } 
        return {
          selectValue: value,
        };
      
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value, multiple } = this.props;
    if (value !== undefined) {
      const arrValue = Array.isArray(value) ? value : `${value}`.split(',');
      this.state = {
        selectValue: multiple ? (arrValue === '' ? undefined : arrValue) : value,
      };
    } else {
      this.state = {
        selectValue: value,
      };
    }
  }

  componentDidMount() {
    const { dispatch, fetchUrl, dictionaryKey, cache } = this.props;
    dispatch({
      type: 'dictionary/query',
      payload: {
        fetchUrl,
        dictionaryKey,
        cache,
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
    const { dispatch, form, onChange, props = {} } = this.props;
    // 自定义onChange
    if (props.onChange) {
      props.onChange({ form, dispatch, changedValue });
    }
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { state } = this;
    const { dictionary = {}, dictionaryKey, placeholder, popupContainer } = this.props;
    const options = dictionary[dictionaryKey] || [];
    return (
      <Cascader
        options={options}
        value={cleanArray(state.selectValue)}
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={this.handleChange}
        getPopupContainer={() => popupContainer}
      />
    );
  }
}
export default DynamicCascader
