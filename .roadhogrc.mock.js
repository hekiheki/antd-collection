

import {getNavigation} from './mock/navigation'

const proxy = {
  'GET /api/navigation': getNavigation
}
//加载mock的数据 通过循环把在 mock 文件夹下的所有配置文件都拿到，并最后export出去
export default proxy;
