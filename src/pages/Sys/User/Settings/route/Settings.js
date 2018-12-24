import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tag, Modal } from 'antd';

import DescriptionList from '@/components/DescriptionList';

import DetailFormInfo from './ModalDetailForm';

const { Description } = DescriptionList;
@connect(({ user, loading, settings }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
  settings,
}))
class BaseSetting extends PureComponent {
  state = {
    modalVisible: false,
  };

  showModalVisibel = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hideModalVisibel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  modalOkHandle = () => {
    this.modalForm.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      // logs('fieldsValue', fieldsValue);
      delete fieldsValue.confirm; // eslint-disable-line
      this.props.dispatch({
        type: 'settings/update',
        payload: {
          ...fieldsValue,
          cb: statusCode => {
            if (statusCode === 200) this.hideModalVisibel();
          },
        },
      });
    });
  };

  render() {
    const { modalVisible } = this.state;
    const { currentUser = {} } = this.props;
    return (
      <Fragment>
        <Card title="个人中心" bordered={false}>
          <DescriptionList size="large" col={1}>
            <Description term="用户名">{currentUser.account}</Description>
            <Description term="手机号">{currentUser.mobile}</Description>
            <Description term="昵称">{currentUser.nickname}</Description>
            <Description term="邮箱">{currentUser.email}</Description>
            <Description term="部门">{currentUser.sysDept.name}</Description>
            <Description term="角色">
              {currentUser.sysRoleList.map(item => (
                <Tag color="cyan" key={item.id}>
                  {item.rolename}
                </Tag>
              ))}
            </Description>
            <Description term="密码">
              <a onClick={() => this.showModalVisibel()}>修改密码</a>
            </Description>
          </DescriptionList>
        </Card>
        <Modal
          title="修改密码"
          destroyOnClose
          visible={modalVisible}
          onCancel={() => this.hideModalVisibel()}
          onOk={() => {
            this.modalOkHandle();
          }}
        >
          <DetailFormInfo
            ref={ref => {
              this.modalForm = ref;
            }}
          />
        </Modal>
      </Fragment>
    );
  }
}
export default BaseSetting;
