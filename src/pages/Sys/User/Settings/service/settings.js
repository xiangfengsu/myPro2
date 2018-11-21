import request from '@/utils/request';

export async function update(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}
