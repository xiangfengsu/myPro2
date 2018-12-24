/* eslint-disable */
import moment from 'moment';
import React from 'react';
import { parse } from 'qs';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import customRouter from '../../config/customRouter.config';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formaterObjectValue(obj) {
  const newObj = {};
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return newObj;
  }
  for (const key in obj) {
    // eslint-disable-next-line
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key] === undefined ? '' : obj[key];
    }
  }
  return newObj;
}
export function formItemAddInitValue(formItems, currentItem) {
  if (!currentItem || Object.prototype.toString.call(currentItem) !== '[object Object]') {
    return formItems;
  }
  const newFormItems = [];
  const currItemKeys = Object.keys(currentItem);
  if (currItemKeys.length > 0) {
    formItems.forEach(item => {
      const index = currItemKeys.indexOf(item.key);
      if (index > -1) {
        newFormItems.push(
          Object.assign({}, item, {
            initialValue: currentItem[currItemKeys[index]],
          })
        );
      } else {
        newFormItems.push(item);
      }
    });
  } else {
    formItems.forEach(item => {
      newFormItems.push(item);
    });
  }

  return newFormItems;
}
export function formItemRemoveInitValue(formItems) {
  return formItems.map(item => {
    // if (item.initialValue !== undefined) {
    //   delete item.initialValue; // eslint-disable-line
    // }
    return {
      ...item,
      initialValue: undefined,
    };
  });
}
export function updateTableColumns(columns = [], updateCol) {
  if (!updateCol || Object.prototype.toString.call(updateCol) !== '[object Object]') return columns;
  if (Object.prototype.toString.call(updateCol) === '[object Array]') {
    return [...columns, ...updateCol];
  }
  const keys = Object.keys(updateCol);
  if (keys.length === 0) return columns;
  return columns.map(item => {
    // eslint-disable-next-line
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      // eslint-disable-next-line
      if (key === item.dataIndex) {
        // eslint-disable-next-line
        item = { ...item, ...updateCol[key] };
        break;
      }
    }
    return item;
  });
}
export function uploadImgFormatter(imgList) {
  if (!Array.isArray(imgList)) return imgList;
  return imgList.map(img => (img.response ? img.response.body : img.url));
}
// 转换list picKeyList=[],把list中的图片字段转化上传照片需要的格式
/*
   [{
      uid: -1,   // 不能为空
      name: 'xxx.png',
      status: 'done',   // 不能为空
      url:'',  // 不能为空
      thumbUrl:''
   }]
*/
export function formatterTableListPic(data, picKeyList = []) {
  const { list = [] } = data;
  const newList = list.map(item => {
    if (picKeyList.length !== 0) {
      picKeyList.forEach(picurl => {
        // eslint-disable-next-line;
        if (item.hasOwnProperty(picurl)) {
          // console.log(item[picurl])
          const urlsList = item[picurl] === '' ? [] : item[picurl].split(',');
          if (urlsList.length !== 0) {
            item[picurl] = urlsList.map((url, index) => ({
              uid: -(index + Date.now()),
              name: '',
              status: 'done',
              thumbUrl: url,
              url,
            }));
          } else {
            item[picurl] = urlsList;
          }
        }
      });
    }
    return { ...item };
  });

  return {
    data: Object.assign({}, data, {
      list: newList,
    }),
  };
}

// 转换list 格式，功能：keyList=[],把list中的dictionary字段转化
export function formatterTableList(data, keyList = []) {
  const { dictionary = {}, list = [] } = data;
  const dicKeys = Object.keys(dictionary);
  const keys = [];
  keyList.forEach(key => {
    if (dicKeys.includes(key)) {
      keys.push(key);
    }
  });
  const newList = list.map(item => {
    keys.forEach(key => {
      const addKey = `${key}Name`;
      const findItem = dictionary[key].find(v => v.key === item[key]);
      if (findItem) {
        item[addKey] = findItem.value;
      }
    });
    return { ...item };
  });

  return {
    data: Object.assign({}, data, {
      list: newList,
    }),
  };
}
export function dateFormatter(date, join = '~') {
  if (!date) {
    return '';
  }
  if (Array.isArray(date)) {
    const [firstDate, lastDate] = date;
    return `${firstDate.format('YYYY-MM-DD')}${join}${lastDate.format('YYYY-MM-DD')}`;
  }
  return date.format('YYYY-MM-DD');
}

export function dateFormatterMoment(date, format = 'YYYY-MM-DD') {
  if (date === '') return '';
  return moment(date, format);
}

function getCustomRouterNameMap() {
  const routerMap = {};
  const mergeMenuAndRouter = data => {
    data.forEach(menuItem => {
      if (menuItem.routes) {
        mergeMenuAndRouter(menuItem.routes);
      }

      if (menuItem.menutype === 2) {
        routerMap[menuItem.path] = menuItem;
      }
    });
  };
  mergeMenuAndRouter(customRouter);
  return routerMap;
}
const memoizeOneRouterNameMap = memoizeOne(getCustomRouterNameMap, isEqual);
export function analyticsCommit(traceInfo = []) {
  const routerMap = memoizeOneRouterNameMap();
  const location = window.g_app._history.location || {};
  const { pathname } = location;
  const len = traceInfo.length;

  if (pathname in routerMap && typeof _hmt === 'object') {
    const { name } = routerMap[pathname];
    if (len === 0) {
      _hmt.push(['_trackEvent', name, 'click', '菜单']);
    } else {
      _hmt.push(['_trackEvent', name, ...traceInfo]);
    }
  }
}
