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
  constructor(props) {
    super(props);
    const { value, multiple } = this.props;
    let selectValue;
    if (value !== undefined) {
      const arrValue = Array.isArray(value) ? value : `${value}`.split(',');
      selectValue = multiple ? (arrValue === '' ? undefined : arrValue) : value;
    } else {
      selectValue = value;
    }
    this.state = {
      selectValue,
      isCheckFirst: props.isCheckFirst,
    };
  }

  componentDidMount() {
    const { dispatch, fetchUrl, dictionaryKey, cache = false } = this.props;
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

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value, multiple, dictionary, dictionaryKey } = nextProps;
      const { isCheckFirst } = this.state;
      let selectValue;
      let flag = isCheckFirst;
      if (value !== undefined) {
        const arrValue = Array.isArray(value) ? value : `${value}`.split(',');
        selectValue = multiple ? (arrValue === '' ? undefined : arrValue) : value;
      } else {
        const dic = dictionary[dictionaryKey];
        if (flag && !!dic) {
          selectValue = dic.length > 0 ? dic[0].key : undefined;
          flag = false;
          this.triggerChange(selectValue);
        }
      }
      this.setState({
        selectValue,
        isCheckFirst: flag,
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
    const {
      dictionary = {},
      dictionaryKey,
      placeholder,
      popupContainer,
      multiple,
      searchFilter,
    } = this.props;
    return (
      <Select
        value={multiple ? cleanArray(state.selectValue) : state.selectValue}
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={this.handleChange}
        showSearch={searchFilter}
        optionFilterProp="children"
        mode={multiple ? 'multiple' : ''}
        getPopupContainer={() => popupContainer}
      >
        {dictionary[dictionaryKey] &&
          dictionary[dictionaryKey].map(v => (
            <Option value={v.key} key={v.key}>
              {v.value}
            </Option>
          ))}
      </Select>
    );
  }
}
export default DynamicSelect;
