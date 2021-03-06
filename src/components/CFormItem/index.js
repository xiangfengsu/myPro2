import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import ItemMap from '@/components/CFormItem/map';

const FormItem = Form.Item;

class WrapFormItem extends Component {
  static defaultProps = {};

  componentDidMount() {}

  getFormItemOptions = ({ onChange, initialValue, rules, fieldDecoratorOptions = {}, form }) => {
    const options = {
      rules: rules || [],
      ...fieldDecoratorOptions,
    };
    options.initialValue = initialValue;

    if (onChange) {
      options.onChange = value => {
        onChange(value, form);
      };
    }

    return options;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const {
      name,
      type,
      component,
      onChange,
      customprops,
      formitemprops,
      initialValue,
      rules,
      fieldDecoratorOptions,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const WrappedComponent = component;

    const otherProps = restProps || {};

    if (type === 'CSelect') {
      const { selectOptions = [] } = otherProps;
      return (
        <FormItem hasFeedback {...formitemprops}>
          {getFieldDecorator(name, options)(
            <WrappedComponent {...customprops} {...otherProps}>
              {selectOptions.map(option => (
                <WrappedComponent.Option
                  key={option.key}
                  value={option.key}
                  disabled={!!option.disabled}
                >
                  {option.value}
                </WrappedComponent.Option>
              ))}
            </WrappedComponent>
          )}
        </FormItem>
      );
    }

    if (type === 'CSelectGroup') {
      const { selectOptions = [] } = otherProps;
      return (
        <FormItem hasFeedback {...formitemprops}>
          {getFieldDecorator(name, options)(
            <WrappedComponent {...customprops} {...otherProps}>
              {selectOptions.map(option => (
                <WrappedComponent.OptGroup label={option.label} key={option.key}>
                  {option.childrenOptions.map(v => (
                    <WrappedComponent.Option value={v.key} key={v.key} disabled={!!option.disabled}>
                      {v.value}
                    </WrappedComponent.Option>
                  ))}
                </WrappedComponent.OptGroup>
              ))}
            </WrappedComponent>
          )}
        </FormItem>
      );
    }

    // if (type === 'CCarModelSelect') {
    //   const { leafInfo } = otherProps;
    //   let len = leafInfo.length;
    //   console.log('otherProps', otherProps);
    //   return (
    //     <Row>
    //       {leafInfo.map(item => {
    //         const { key, initialValue, ...itemPropsRest } = item;
    //         return (
    //           <Col span={8} key={key}>
    //             <FormItem hasFeedback {...formitemprops}>
    //               {getFieldDecorator(key, { ...options, initialValue })(
    //                 <WrappedComponent {...customprops} {...otherProps} {...itemPropsRest} />
    //               )}
    //             </FormItem>
    //           </Col>
    //         );
    //       })}
    //     </Row>
    //   );
    // }

    if (type === 'CCheckboxGroup' || type === 'CRadioGroup') {
      const { selectOptions = [], itemColSpan = 6, ...restOtherPorps } = otherProps;
      return (
        <FormItem {...formitemprops}>
          {getFieldDecorator(name, options)(
            <WrappedComponent.Group {...customprops} {...restOtherPorps}>
              <Row>
                {selectOptions.map(checkitem => (
                  <Col lg={itemColSpan} key={checkitem.value} xs={12}>
                    <WrappedComponent value={checkitem.value}>{checkitem.label}</WrappedComponent>
                  </Col>
                ))}
              </Row>
            </WrappedComponent.Group>
          )}
        </FormItem>
      );
    }

    return (
      <FormItem hasFeedback {...formitemprops}>
        {getFieldDecorator(name, options)(<WrappedComponent {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const CFormItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  CFormItem[key] = props => (
    <WrapFormItem
      type={key}
      formitemprops={item.formitemprops || {}}
      customprops={item.props || {}}
      component={item.component}
      rules={item.rules || []}
      {...props}
    />
  );
});

export default CFormItem;
