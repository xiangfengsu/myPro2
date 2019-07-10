import React, { Component } from 'react';
import { Checkbox, Row, Col } from 'antd';
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';
import styles from './index.less';

export default class CheckboxGroupImage extends Component {
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
    this.lightBoxRef = React.createRef();
    this.state = {
      selectValue: value,
    };
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

  handlePreview = index => {
    if (this.lightBoxRef.current) {
      this.lightBoxRef.current.toggleLightbox(index);
    }
  };

  getCarouserImages = () => {
    const { selectOptions } = this.props;
    return selectOptions.map(({ value }, index) => ({
      src: value,
      index,
      title: `图片-${index}`,
    }));
  };

  renderImageFunc = (idx, image, toggleLightbox, width, height) => (
    <img
      alt=""
      key={idx}
      src={image.src}
      className="img-circle"
      style={{ width, height, display: 'none' }}
      onClick={toggleLightbox.bind(null, idx)}
    />
  );

  render() {
    const { selectValue = [] } = this.state;
    const { itemColSpan = 6, selectOptions, ...restProps } = this.props;
    const carouserImages = this.getCarouserImages();
    return (
      <>
        <Checkbox.Group value={selectValue} onChange={this.handleChange} {...restProps}>
          <Row>
            {selectOptions.map((item, index) => (
              <Col lg={itemColSpan} key={item.value} xs={12}>
                <div className={styles['checkbox-group-wrap']}>
                  <div
                    className={styles['checkbox-group-wrap-img']}
                    onClick={() => this.handlePreview(index)}
                  >
                    <img src={item.value} alt="" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <Checkbox value={item.value} />
                </div>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        {carouserImages.length > 0 ? (
          <Lightbox
            ref={this.lightBoxRef}
            images={carouserImages}
            renderImageFunc={this.renderImageFunc}
            renderDescriptionFunc={() => null}
          />
        ) : null}
      </>
    );
  }
}
