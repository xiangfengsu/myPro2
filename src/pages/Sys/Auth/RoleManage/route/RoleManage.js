import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Modal, Button, Popconfirm, Tag } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import SearchForms from '@/components/GeneralSearchForm/Index';
import TableList from '@/components/GeneralTableList/Index';
import MenuTree from '@/components/TreeSelectModal/Index';
import { formaterObjectValue, formItemAddInitValue } from '@/utils/utils';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import pageConfig from './pageConfig';
import DetailFormInfo from './ModalDetailForm';
import styles from './Index.less';

// const FormItem = Form.Item;

@connect(({ user, loading, rolemanage, dictionary }) => ({
  currentUser: user.currentUser,
  loading: loading.models.rolemanage,
  rolemanage,
  dictionary,
}))
@Form.create()
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.pageConfig = pageConfig(props.form);
    this.state = {
      showModalType: '',
      queryValues: {},
      currentItem: {},
      isShowMenuTree: false,
      detailFormItems: this.pageConfig.detailFormItems,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rolemanage/fetch',
      payload: this.queryParamsFormater(),
    });
  }

  updateFormItems = (record = {}) => {
    const detailFormItems = cloneDeep(this.pageConfig.detailFormItems);
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    this.setState({ detailFormItems: newDetailFormItems });
  };

  showModalVisibel = (type, record, isShowMenuTree = false) => {
    // logs("record", record);
    if (!isShowMenuTree) {
      this.updateFormItems(record);
      this.changeModalVisibel(true);
      this.setState({
        showModalType: type,
        currentItem: record,
        isShowMenuTree,
      });
    } else {
      this.queryStructorTreeHandle();
      this.changeModalVisibel(true);
      this.setState({
        currentItem: record,
        isShowMenuTree,
      });
    }
  };

  hideModalVisibel = () => {
    this.changeModalVisibel(false);
    this.setState({
      currentItem: {},
    });
  };

  changeModalVisibel = flag => {
    this.props.dispatch({
      type: 'rolemanage/modalVisible',
      payload: {
        modalVisible: flag,
      },
    });
  };

  extraTableColumnRender = () => {
    const columns = [
      {
        title: '菜单权限',
        render: (text, record) => (
          <Tag color="#1890ff" onClick={() => this.showModalVisibel('create', record, true)}>
            查看
          </Tag>
        ),
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a
              color="#1890ff"
              onClick={() => {
                this.showModalVisibel('update', record);
              }}
            >
              编辑
            </a>
            &nbsp;
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => {
                this.deleteTableRowHandle(record.id);
              }}
            >
              <a color="#f5222d">删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ];
    return columns;
  };

  queryStructorTreeHandle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionary/query',
      payload: {
        fetchUrl: '/sys/menu/dic',
        dictionaryKey: 'menuStructure',
      },
    });
  };

  modalOkHandle = () => {
    const { isShowMenuTree } = this.state;
    if (!isShowMenuTree) {
      this.modalForm.validateFieldsAndScroll((err, fieldsValue) => {
        if (err) return;
        // logs('fieldsValue', fieldsValue);
        const { showModalType } = this.state;
        const fields = formaterObjectValue(fieldsValue);
        if (showModalType === 'create') {
          this.props.dispatch({
            type: 'rolemanage/add',
            payload: this.queryParamsFormater(fields, 3),
          });
        } else if (showModalType === 'update') {
          this.props.dispatch({
            type: 'rolemanage/update',
            payload: this.queryParamsFormater(fields, 2),
          });
        }
      });
    } else {
      this.hideModalVisibel();
    }
  };

  deleteTableRowHandle = id => {
    this.props.dispatch({
      type: 'rolemanage/remove',
      payload: this.queryParamsFormater({ id }, 2),
    });
  };

  queryParamsFormater = (fields, type) => {
    // type 1:查询  2:update|delete  3:save  4:分页
    const {
      data: { pagination },
    } = this.props.rolemanage;
    delete pagination.total;
    const params = {
      form: {},
      query: {},
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
    switch (type) {
      case 1:
        Object.assign(params, {
          query: { ...fields },
        });
        break;
      case 2:
        Object.assign(params, {
          query: { ...this.state.queryValues },
          form: { ...fields },
          pagination,
        });
        break;
      case 3:
        Object.assign(params, {
          form: { ...fields },
        });
        break;
      case 4:
        Object.assign(params, {
          query: { ...this.state.queryValues },
          pagination: { current: fields.page, pageSize: fields.pageSize },
        });
        break;
      default:
        Object.assign(params, {});
    }
    return params;
  };

  renderSearchForm = () => {
    const { form, dispatch } = this.props;
    const { searchForms } = this.pageConfig;
    const props = {
      form,
      formInfo: {
        layout: 'inline',
        formItems: searchForms,
      },
      handleSearchSubmit: queryValues => {
        const params = Object.assign({}, queryValues, {});
        const payload = formaterObjectValue(params);
        this.setState({
          queryValues: payload,
        });
        dispatch({
          type: 'rolemanage/fetch',
          payload: this.queryParamsFormater(payload, 1),
        });
      },
      handleFormReset: () => {
        this.setState({
          queryValues: {},
        });
        dispatch({
          type: 'rolemanage/fetch',
          payload: this.queryParamsFormater(),
        });
      },
    };
    return <SearchForms {...props} />;
  };

  renderTable = () => {
    const { rolemanage, loading } = this.props;
    const { tableColumns } = this.pageConfig;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const {
      data: { list, pagination },
    } = rolemanage;
    const tableProps = {
      loading,
      bordered: false,
      dataSource: list,
      columns: newTableColumns,
      pagination: Object.assign(pagination, { pageSize: 10 }),
      handleTableChange: ({ current }) => {
        const { dispatch } = this.props;
        const payload = {
          page: current,
          pageSize: 10,
        };
        dispatch({
          type: 'rolemanage/fetch',
          payload: this.queryParamsFormater(payload, 4),
        });
      },
    };
    return <TableList {...tableProps} />;
  };

  render() {
    const { detailFormItems, isShowMenuTree, currentItem } = this.state;
    const {
      rolemanage: { modalVisible, confirmLoading },
      dictionary,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSearchForm()}
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
          {!isShowMenuTree ? (
            <DetailFormInfo
              ref={ref => {
                this.modalForm = ref;
              }}
              formItems={detailFormItems}
              dictionary={dictionary}
            />
          ) : (
            <MenuTree currentItem={currentItem} dictionary={dictionary} />
          )}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
