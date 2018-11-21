import request from '@/utils/request';

export async function queryDic(params) {
  const { fetchUrl } = params;
  delete params.fetchUrl; // eslint-disable-line

  return request(`${fetchUrl}`);
}
