import React, { Component } from 'react';
import { Upload, Icon, Button, Modal, message } from 'antd';
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';

const regpHandle = text => /^http.*(gif|png|jpe?g|GIF|PNG|JPE?G)$/.test(text);

class UploadImg extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        fileList: nextProps.value || [],
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value = [] } = this.props;
    this.state = {
      fileList: value,
    };
    this.lightBoxRef = React.createRef();
    this.uploadTotalCounts = 0;
  }

  onRemove = file => {
    Modal.confirm({
      title: '删除',
      content: '确认要删除该文件吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          this.triggerChange(newFileList);
          return {
            fileList: newFileList,
          };
        });
        message.success('删除成功！');
      },
    });

    return false;
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  beforeUpload = (file, fileList) => {
    const { size } = file;
    const { maxFileSize, maxFileCounts } = this.props;
    const maxSize = maxFileSize * 1024 * 1024;
    const preFileListLength = this.state.fileList.length;
    const currFileListLength = fileList.length;
    const num = preFileListLength + currFileListLength - maxFileCounts; //eslint-disable-line
    const currFileIndex = fileList.findIndex(f => f.uid === file.uid);
    if (size > maxSize) {
      message.error(`文件大小不能超过${maxFileSize}M`);
      file.flag = true; //eslint-disable-line
      return false;
    }
    if (num > 0) {
      const maxCanUploadFileNum = currFileListLength - num;
      // eslint-disable-next-line
      for (let i = 0; i < currFileListLength; i++) {
        if (currFileIndex >= maxCanUploadFileNum) {
          message.error(`${file.name}不能上传，最多上传${maxFileCounts}张`); //eslint-disable-line
          file.flag = true; //eslint-disable-line
          return false;
        }
        return true;
      }
    } else {
      return true;
    }
  };

  handleChange = ({ file, fileList }) => {
    if (file.flag) return;
    const { listType } = this.props;
    const { status } = file;
    if (status === 'done') {
      message.success(`${file.name} 上传成功！.`);
    } else if (status === 'error') {
      message.error(`${file.name} 上传失败`);
    }
    // eslint-disable-next-line
    fileList = fileList.filter(f => {
      // eslint-disable-line
      if (f.status) {
        return f.status !== 'error';
      }
      return true;
    });
    if (listType === 'text') {
      // eslint-disable-next-line
      fileList = fileList.map(file => {
        // eslint-disable-line
        if (file.response) {
          file.url = file.response.body; // eslint-disable-line
        }
        return file;
      });
    }
    if (!('value' in this.props)) {
      this.setState({ fileList });
    }
    this.triggerChange(fileList);
  };

  getCarouserImages = () => {
    const { fileList } = this.state;
    const carouserImages = fileList
      .filter(
        fl =>
          // eslint-disable-line
          fl.status === 'done' && regpHandle(fl.response ? fl.response.body : fl.url)
      )
      .map((f = {}) => ({
        uid: f.uid,
        src: f.response ? f.response.body : f.url,
        title: f.name,
      }));
    return carouserImages;
  };

  handlePreview = file => {
    if (!file.thumbUrl) return;
    if (!regpHandle(file.response ? file.response.body : file.url)) {
      message.error('该文件不是图片类型，无法预览');
      return;
    }
    const carouserImages = this.getCarouserImages();
    const carouserFirstIndex = carouserImages.findIndex(cfile => cfile.uid === file.uid);
    if(this.lightBoxRef.current){
      this.lightBoxRef.current.toggleLightbox(carouserFirstIndex === -1 ? 0 : carouserFirstIndex);
    }

  };


  renderUploadBtn = () => {
    // 1:text  2:picture 3:picture-card
    const { listType } = this.props;
    let content = null;
    switch (listType) {
      case 'text':
        content = (
          <div>
            <Button>
              <Icon type="upload" /> 上传文件
            </Button>
          </div>
        );
        break;
      case 'picture-card':
        content = (
          <div>
            {' '}
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
          </div>
        );
        break;
      case 'picture':
      default:
        content = (
          <div>
            <Button>
              <Icon type="upload" /> 上传文件
            </Button>
          </div>
        );
        break;
    }
    return content;
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
    const { fileList } = this.state;

    const { action, maxFileCounts, multiple, acceptType, listType } = this.props;
    const carouserImages = this.getCarouserImages();
    return (
      <div className="clearfix customUpload">
        <Upload
          action={action}
          accept={acceptType}
          multiple={multiple}
          listType={listType}
          fileList={fileList}
          onPreview={listType === 'text' ? null : this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
        >
          {fileList.length >= maxFileCounts ? null : this.renderUploadBtn()}
        </Upload>

        {carouserImages.length > 0 ? (
          <Lightbox
            ref={this.lightBoxRef}
            images={carouserImages}
            renderImageFunc={this.renderImageFunc}
          />
        ) : null}
      </div>
    );
  }
}
export default UploadImg;
