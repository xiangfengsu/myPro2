import React from 'react';
import { connect } from 'dva';
import { Form, Card, Modal, Button, Popconfirm } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import findLastIndex from 'lodash/findLastIndex';
import TableList from '@/components/GeneralTableList/Index';
import SearchForms from '@/components/GeneralSearchForm/Index';
import MenuTree from './MenuTree';
import { formaterObjectValue, formItemAddInitValue } from '@/utils/utils';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DetailFormInfo from './ModalDetailForm';
import pageConfig from './pageConfig';
import styles from './Index.less';

@connect(({ user, loading, usermanage, dictionary }) => ({
  currentUser: user.currentUser,
  loading: loading.models.usermanage,
  usermanage,
  dictionary,
}))
@Form.create()
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.pageConfig = pageConfig(props.form);
    this.state = {
      showModalType: '',
      formValues: {},
      queryValues: {},
      currentItem: {},
      isShowMenuTree: false,
      detailFormItems: this.pageConfig.detailFormItems,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'usermanage/fetch',
      payload: this.queryParamsFormater(),
    });
  }

  updateFormItems = (record = {}, type = '') => {
    const detailFormItems = cloneDeep(this.pageConfig.detailFormItems);
    if (type === 'update') {
      const { mobiles = [] } = record;
      if (mobiles.length > 1) {
        const mobileItem = detailFormItems.find(item => item.key === 'mobile');
        const lastIndex = findLastIndex(detailFormItems, item => item.type === 'add');
        const mobileItems = mobiles.map((m, index) => {
          const newItem = cloneDeep(mobileItem);
          Object.assign(newItem, {
            key: `${Date.now()}_${index + 1}_mobile`,
            initialValue: m,
          });
          return newItem;
        });
        detailFormItems.splice(lastIndex === -1 ? 1 : lastIndex + 1, 0, ...mobileItems);
      }
    }
    const newDetailFormItems = formItemAddInitValue(detailFormItems, record);
    this.setState({ detailFormItems: newDetailFormItems });
  };

  updateFormMobilesItems = newDetailFormItems => {
    this.setState({ detailFormItems: newDetailFormItems });
  };

  changeModalVisibel = flag => {
    this.props.dispatch({
      type: 'usermanage/modalVisible',
      payload: {
        modalVisible: flag,
      },
    });
  };

  showModalVisibel = (type, record, isShowMenuTree = false) => {
    if (!isShowMenuTree) {
      this.updateFormItems(record, type);
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

  extraTableColumnRender = () => {
    const columns = [
      {
        title: '菜单权限',
        render: (text, record) => (
          <div>
            <a onClick={() => this.showModalVisibel('create', record, true)}>查看</a>
          </div>
        ),
        fixed: 'right',
        width: 90,
      },
      {
        title: '操作',
        fixed: 'right',
        width: 100,
        render: (text, record) => (
          <div>
            <a
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
              <a>删除</a>
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
        const { showModalType } = this.state;
        const fields = formaterObjectValue(fieldsValue);
        const mobiles = [];
        const fieldsList = Object.keys(fields);
        for (let i = 0; i < fieldsList.length; i += 1) {
          const key = fieldsList[i];
          if (/mobile/gi.test(key)) {
            mobiles.push(fields[key]);
            if (key !== 'mobile') {
              delete fields[key]; // eslint-disable
            }
          }
        }

        Object.assign(fields, { mobiles });
        if (showModalType === 'create') {
          this.props.dispatch({
            type: 'usermanage/add',
            payload: this.queryParamsFormater(fields, 3),
          });
        } else if (showModalType === 'update') {
          this.props.dispatch({
            type: 'usermanage/update',
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
      type: 'usermanage/remove',
      payload: this.queryParamsFormater({ id }, 2),
    });
  };

  queryParamsFormater = (fields, type) => {
    // type 1:查询  2:update|delete  3:save  4:分页
    const {
      data: { pagination },
    } = this.props.usermanage;
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
      handleSearchSubmit: formValues => {
        const params = Object.assign({}, formValues, {});
        const payload = formaterObjectValue(params);
        this.setState({
          queryValues: payload,
        });
        dispatch({
          type: 'usermanage/fetch',
          payload: this.queryParamsFormater(payload, 1),
        });
      },
      handleFormReset: () => {
        this.setState({
          queryValues: {},
        });
        dispatch({
          type: 'usermanage/fetch',
          payload: this.queryParamsFormater(),
        });
      },
    };
    return <SearchForms {...props} />;
  };

  renderTable = () => {
    const { usermanage, loading } = this.props;
    const { tableColumns } = this.pageConfig;
    const newTableColumns = [...tableColumns, ...this.extraTableColumnRender()];
    const {
      data: { list, pagination },
    } = usermanage;
    const tableProps = {
      loading,
      bordered: false,
      dataSource: list,
      pagination: Object.assign(pagination, { pageSize: 10 }),
      columns: newTableColumns,
      handleTableChange: ({ current }) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        const payload = {
          page: current,
          pageSize: 10,
          ...formValues,
        };
        dispatch({
          type: 'usermanage/fetch',
          payload: this.queryParamsFormater(payload, 4),
        });
      },
      otherProps: {
        scroll: { x: 1400 },
      },
    };
    return <TableList {...tableProps} />;
  };

  render() {
    const { detailFormItems, isShowMenuTree, currentItem, showModalType } = this.state;
    const {
      usermanage: { modalVisible, confirmLoading },
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
          maskClosable={false}
          destroyOnClose
          confirmLoading={confirmLoading}
          visible={modalVisible}
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
              modalType={showModalType}
              updateFormItems={this.updateFormMobilesItems}
            />
          ) : (
            <MenuTree
              ref={ref => {
                this.menuForm = ref;
              }}
              disabled
              currentItem={currentItem}
            />
          )}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
