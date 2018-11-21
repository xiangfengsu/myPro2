import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class QRcode extends PureComponent {
  static getDerivedStateFromProps(nextProps) {
    const { statuscode, updateStatusCode, captcha } = nextProps;
    if (statuscode !== 200) {
      if (updateStatusCode) updateStatusCode();
      return {
        codeUrl: `${captcha}?num=${new Date().getTime()}`,
      };
    }
    return null;
  }

  static propTypes = {
    captcha: PropTypes.string,
  };

  static defaultProps = {
    captcha: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      codeUrl: props.captcha,
    };
  }

  refreshCode = () => {
    const { captcha } = this.props;
    this.setState({
      codeUrl: `${captcha}?num=${new Date().getTime()}`,
    });
  };

  render() {
    const { codeUrl } = this.state;
    return (
      <img
        onClick={this.refreshCode}
        src={codeUrl}
        style={{
          width: '100px',
          height: '40px',
          cursor: 'pointer',
          border: '1px solid #d9d9d9',
        }}
        alt=""
      />
    );
  }
}
export default QRcode;
