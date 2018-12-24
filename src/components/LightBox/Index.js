import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon } from 'antd';

import CustomCarouser from './Carouser';

import styles from './Index.less';

export default class Index extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    modalVisible: false,
    currentIndex: 0,
  };

  showModal = index => {
    this.setState({
      modalVisible: true,
      currentIndex: index,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { images } = this.props;
    const { modalVisible, currentIndex } = this.state;
    return (
      <div className={styles.lightBoxWrap}>
        <Row gutter={10}>
          {images.map((image, i) => (
            <Col
              key={`img_${i}`} /* eslint-disable-line */
              xs={12}
              sm={8}
              md={6}
              xl={4}
              style={{ marginBottom: 16 }}
            >
              <div
                className={styles.imgWrap}
                onClick={() => {
                  this.showModal(i);
                }}
              >
                <div className={styles.imgBox}>
                  <img src={image.src} alt="" />
                  <span className={styles.listItemAction}>
                    <Icon
                      type="eye-o"
                      style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 16,
                      }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: 8 }}>{image.name}</div>
              </div>
            </Col>
          ))}
        </Row>
        {images.length > 0 ? (
          <CustomCarouser
            visible={modalVisible}
            images={images}
            currentIndex={currentIndex}
            hideCarouser={this.hideModal}
          />
        ) : null}
      </div>
    );
  }
}
