import React, { Component } from 'react';
import { connect } from 'dva';

import { Select } from 'antd';

const { Option } = Select;
const cleanArray = arr => {
  if (!(arr instanceof Array)) {
    arr = []; /* eslint-disable-line */
  }
  return arr.filter(e => e !== undefined && e !== null && e !== '');
};
@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicSelect extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      const { value, multiple } = nextProps;
      if (value !== undefined) {
        const arrValue = `${value}`.split(',');
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
      const arrValue = `${value}`.split(',');
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
    const { dispatch, fetchUrl, dictionaryKey } = this.props;
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
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { state } = this;
    const { dictionary = {}, dictionaryKey, placeholder, popupContainer, multiple } = this.props;
    return (
      <Select
        value={multiple ? cleanArray(state.selectValue) : state.selectValue}
        placeholder={placeholder}
        mode={multiple ? 'multiple' : ''}
        style={{ width: '100%' }}
        onChange={this.handleChange}
        getPopupContainer={() => popupContainer}
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
    );
  }
}
export default DynamicSelect;
