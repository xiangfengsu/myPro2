import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryPost(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export async function query(params, url) {
  return request(`${url}?${stringify(params)}`);
}
export async function create(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export async function update(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export async function remove(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}
