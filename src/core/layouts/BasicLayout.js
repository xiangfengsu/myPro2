import React from 'react';
import { Layout, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import memoizeOne from 'memoize-one';
import router from 'umi/router';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import SiderMenu from '@/components/SiderMenu';
import Authorized from '@/utils/Authorized';
import SettingDrawer from '@/components/SettingDrawer';
import logo from '@/assets/logo.svg';
import Exception403 from '@/pages/Exception/403';
import defaultSettings from '@/defaultSettings';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';

const { Content } = Layout;
const { title, whiteListPath, isLocalMenus } = defaultSettings;

// Conversion router to menu.
function formatter(data) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }
      const result = {
        ...item,
      };
      const child = item.children || item.routes;
      if (child) {
        const children = formatter(child);
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const getFlatArray = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    const child = item.children || item.routes;
    if (child) {
      return keys.concat(getFlatArray(child));
    }
    return keys;
  }, []);
const getFlatMenuArray = (menu = []) =>
  menu.reduce((preItem, currItem) => {
    preItem.push(currItem);
    const child = currItem.children || currItem.routes;
    if (child) {
      return preItem.concat(getFlatMenuArray(child));
    }
    return preItem;
  }, []);

const memoizeOneFormatter = memoizeOne(formatter, isEqual);
const memoizeOneFlatArrayKeys = memoizeOne(memoizeOne(getFlatArray, isEqual));
const memoizeOneFlatMenu = memoizeOne(getFlatMenuArray, isEqual);

// 默认跳转到第一个 menutype=2 的 路径
const baseRedirectPath = props => {
  const {
    route: { routes = [] },
    currentUser = {},
    location: { pathname },
  } = props;
  const { menuList = [] } = currentUser;
  const menus = isLocalMenus ? routes : menuList;
  if (menus.length !== 0 && pathname === '/') {
    const item = memoizeOneFlatMenu(menus).find(it => it.menutype === 2) || {};
    const redirectPath = item.path;
    router.replace(redirectPath);
  }
};

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  static getDerivedStateFromProps(props) {
    baseRedirectPath(props);
    return null;
  }

  state = {
    rendering: true,
    isMobile: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap || {},
    };
  }

  getMenuData() {
    const {
      route: { routes },
      currentUser: { menuList = [] },
    } = this.props;
    if (isLocalMenus) {
      return memoizeOneFormatter(routes);
    }
    return memoizeOneFormatter(menuList);
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = pathname => {
    const breadcrumbNameMap = this.getBreadcrumbNameMap() || {};
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      return title;
    }
    return `${currRouterData.name} - ${title}`;
  };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };



  getMenuAuthorized = path => {
    const {
      route: { routes },
    } = this.props;
    const menuData = [...this.getMenuData(), ...whiteListPath];
    const routesList = uniq(memoizeOneFlatArrayKeys(routes));
    if (routesList.includes(path)) {
      return memoizeOneFlatArrayKeys(menuData).includes(path);
    }
    return true;
  };

  renderSettingDrawer() {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    const { rendering } = this.state;
    if ((rendering || process.env.NODE_ENV === 'production') && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  }

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      currentUser = {},
    } = this.props;

    const { menuList = [] } = currentUser;
    const { isMobile } = this.state;
    const isTop = PropsLayout === 'topmenu';
    const menuData = this.getMenuData();
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            Authorized={Authorized}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            <Authorized
              authority={() => this.getMenuAuthorized(pathname)}
              noMatch={<Exception403 />}
            >
              {children}
            </Authorized>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    if (menuList.length === 0) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            margin: 'auto',
            paddingTop: 100,
            textAlign: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      );
    }
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {this.renderSettingDrawer()}
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, user = {} }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  currentUser: user.currentUser,
  ...setting,
}))(BasicLayout);
