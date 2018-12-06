import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Modal, Button } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import TreeTable from '@/components/TreeTable/Index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formaterObjectValue, formItemAddInitValue } from '@/utils/utils';
import styles from './Index.less';

import pageConfig from './pageConfig';

import DetailFormInfo from './ModalDetailForm';

@connect(({ user, loading, department, dictionary }) => ({
  currentUser: user.currentUser,
  loading: loading.models.department,
  department,
  dictionary,
}))
@Form.create()
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.pageConfig = pageConfig(props.form);
    this.state = {
      showModalType: '',
      currentItem: {},
      detailFormItems: this.pageConfig.detailFormItems,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/fetch',
    });
  }

  updateFormItems = (record = {}) => {
    const detailFormItems = cloneDeep(this.pageConfig.detailFormItems);
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    this.setState({ detailFormItems: newDetailFormItems });
  };

  showModalVisibel = (type, record) => {
    this.updateFormItems(record);
    this.changeModalVisibel(true);
    this.setState({
      showModalType: type,
      currentItem: record,
    });
  };

  hideModalVisibel = () => {
    this.changeModalVisibel(false);
    this.setState({
      currentItem: {},
    });
  };

  changeModalVisibel = flag => {
    this.props.dispatch({
      type: 'department/modalVisible',
      payload: {
        modalVisible: flag,
      },
    });
  };

  extraTableColumnRender = () => {
    const columns = [
      {
        title: '操作',
        render: (text, record) => {
          if (record.parentid !== 0) {
            return (
              <div>
                <a
                  onClick={() => {
                    this.showModalVisibel('update', record);
                  }}
                >
                  编辑
                </a>
                {/* &nbsp;
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={() => {
                    this.deleteTableRowHandle(record.id);
                  }}
                >
                  <a>删除</a>
                </Popconfirm> */}
              </div>
            );
          }
        },
      },
    ];
    return columns;
  };

  modalOkHandle = () => {
    this.modalForm.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      // logs('fieldsValue', fieldsValue);
      const { showModalType } = this.state;
      const fields = formaterObjectValue(fieldsValue);
      if (showModalType === 'create') {
        this.props.dispatch({
          type: 'department/add',
          payload: fields,
        });
      } else if (showModalType === 'update') {
        const { id } = this.state.currentItem;
        this.props.dispatch({
          type: 'department/update',
          payload: { id, ...fields },
        });
      }
    });
  };

  deleteTableRowHandle = id => {
    this.props.dispatch({
      type: 'department/remove',
      payload: { id },
    });
  };

  renderTable = () => {
    const { department, loading } = this.props;
    const { tableColumns } = this.pageConfig;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const {
      data: { list },
    } = department;
    const tableProps = {
      loading,
      dataSource: list,
      columns: newTableColumns,
    };
    return <TreeTable {...tableProps} />;
  };

  render() {
    const { detailFormItems } = this.state;
    const {
      department: { modalVisible, confirmLoading },
      dictionary,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <div className={styles.tableListOperator}>
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => this.showModalVisibel('create', {})}
                >
                  新建
                </Button>
              </div>
              {this.renderTable()}
            </div>
          </div>
        </Card>
        <Modal
          // width={modalWidth}
          destroyOnClose
          visible={modalVisible}
          confirmLoading={confirmLoading}
          onCancel={() => this.hideModalVisibel()}
          onOk={() => {
            this.modalOkHandle();
          }}
        >
          <DetailFormInfo
            ref={ref => {
              this.modalForm = ref;
            }}
            formItems={detailFormItems}
            dictionary={dictionary}
          />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
