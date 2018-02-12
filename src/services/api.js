import request from '../utils/request';

export async function queryNavigationList() {
  return request('/api/navigation');
}
