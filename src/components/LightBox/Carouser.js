import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Carousel, Icon } from 'antd';

const SamplePrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        fontSize: 50,
        width: 50,
        height: 50,
        left: -50,
      }}
      onClick={onClick}
    >
      <Icon type="left" style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
    </div>
  );
};
const SampleNextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        fontSize: 50,
        width: 50,
        height: 50,
        right: -50,
      }}
      onClick={onClick}
    >
      <Icon type="right" style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
    </div>
  );
};

// const
export default class CustomCarouser extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    visible: PropTypes.bool,
    currentIndex: PropTypes.number,
    hideCarouser: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    currentIndex: 0,
    hideCarouser: () => {},
  };

  render() {
    const { images, visible, currentIndex, hideCarouser } = this.props;
    // logs('images', images);
    const carouselProps = {
      arrows: true,
      adaptiveHeight: true,
      initialSlide: currentIndex,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      infinite: false,
    };
    return (
      <Modal
        title={null}
        width={700}
        visible={visible}
        footer={null}
        destroyOnClose
        onCancel={() => hideCarouser()}
      >
        <div style={{ padding: '16px 24px 16px' }}>
          <Carousel {...carouselProps}>
            {images.map((img, i) => (
              /* eslint-disable-next-line */
              <div key={i}>
                <div className="image-modal-container">
                  <img src={img.url} style={{ width: '100%' }} alt="" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Modal>
    );
  }
}
