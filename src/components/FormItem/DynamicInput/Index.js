import React, { Component } from 'react';
import { connect } from 'dva';

import { Input } from 'antd';

@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicInput extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { dictionary = {}, dictionaryKey, value } = nextProps;
    const curValue = dictionary[dictionaryKey];

    if ('value' in nextProps) {
      if (value === undefined) {
        return {
          value: curValue,
        };
      }
      return {
        value,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      value,
    };
  }

  componentDidMount() {
    const { dispatch, fetchUrl, dictionaryKey, cache } = this.props;
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

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      this.triggerChange(value);
    }
  }

  handleChange = value => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { value } = this.state;
    const { placeholder, isReadOnly } = this.props;
    return (
      <Input
        readOnly={isReadOnly}
        value={value}
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={this.handleChange}
      />
    );
  }
}
export default DynamicInput
