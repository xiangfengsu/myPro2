import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card } from 'antd';

import { formaterObjectValue } from '@/utils/utils';
import SearchForms from '@/components/GeneralSearchForm/Index';
import TableList from '@/components/GeneralTableList/Index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import pageConfig from './pageConfig';

import styles from './Index.less';

@connect(({ user, systemlog, loading }) => ({
  currentUser: user.currentUser,
  systemlog,
  loading: loading.models.systemlog,
}))
@Form.create()
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.pageConfig = pageConfig(props.form);
    this.state = {
      formValues: {},
      queryValues: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemlog/fetch',
      payload: this.queryParamsFormater(),
    });
  }

  queryParamsFormater = (fields, type) => {
    // type 1:查询  2:update|delete  3:save  4:分页
    const {
      data: { pagination },
    } = this.props.systemlog;
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
          type: 'systemlog/fetch',
          payload: this.queryParamsFormater(payload, 1),
        });
      },
      handleFormReset: () => {
        this.setState({
          queryValues: {},
        });
        dispatch({
          type: 'systemlog/fetch',
          payload: this.queryParamsFormater(),
        });
      },
    };
    return <SearchForms {...props} />;
  };

  renderTable = () => {
    const { systemlog, loading } = this.props;
    const { tableColumns } = this.pageConfig;
    const {
      data: { list, pagination },
    } = systemlog;
    const newTableColumns = [...tableColumns];
    const tableProps = {
      loading,
      dataSource: list,
      columns: newTableColumns,
      pagination: Object.assign(pagination, { pageSize: 10 }),
      handleTableChange: ({ current }) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        const payload = {
          page: current,
          pageSize: 10,
          ...formValues,
        };
        dispatch({
          type: 'systemlog/fetch',
          payload: this.queryParamsFormater(payload, 4),
        });
      },
      bordered: false,
    };
    return <TableList {...tableProps} />;
  };

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSearchForm()}
              {this.renderTable()}
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
