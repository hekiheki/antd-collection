import { queryNavigationList } from '../services/api';

const localList = JSON.parse(localStorage.getItem('list'));
const defaultList = [{
  tagName: '日常',
  tagItem: [{itemName:'百度',itemUrl:'http://www.baidu.com'},{itemName:'bilibili',itemUrl:'http://www.bilibili.com'}],
},{
  tagName: '技术',
  tagItem: [{itemName:'百度',itemUrl:'http://www.baidu.com'},{itemName:'antd',itemUrl:'https://ant.design/index-cn'}],
},{
  tagName: '娱乐',
  tagItem: [{itemName:'bilibili',itemUrl:'http://www.bilibili.com'},{itemName:'优酷',itemUrl:'http://www.youku.com'}],
}];

export default {
  namespace: 'navigation',
  state: {
    list: localList ? localList : defaultList,
    closable: false,
  },
  reducers: {
    add(state, { payload } ) {
      const {selectedTags,itemName,itemUrl,list} = payload;
      let newTags= selectedTags;
      list.map(function(e){
        if(selectedTags.includes(e.tagName)){
          e.tagItem.push({itemName:itemName,itemUrl:itemUrl})
          newTags = newTags.filter(tag => tag != e.tagName)
        }
      })
      newTags.map(function(item){
        list.push({tagName:item,tagItem:[{itemName:itemName,itemUrl:itemUrl}]})
      })
      localStorage.setItem('list',JSON.stringify(list));
      return {...state, list: list }
    },
    saveList(state,{ payload }){
      const localList = JSON.parse(localStorage.getItem('list'));
      return {
        ...state,
        list: localList ? localList : payload,
      };
    },
    showDeleteIcon(state, { payload }){
      return { ...state, ...payload }
    },
    deleteItems(state, { payload }){
      const { tagName, list, itemIndex } = payload;

      list.map(function(item){
        if( item.tagName == tagName){
          item.tagItem.splice(itemIndex,1)
        }
      });

      localStorage.setItem('list',JSON.stringify(list));

      return { ...state, list: list }
    },
    deleteTags(state, { payload }){
      const { list, tagIndex } = payload;

      list.splice(tagIndex,1);

      localStorage.setItem('list',JSON.stringify(list));

      return { ...state, list: list }
    }
  },
  effects: {
    // *fetchList({}, {call,put}){
    //   const response = yield call(queryNavigationList,'api/navigation');
    //   yield put({
    //     type: 'saveList',
    //     payload: Array.isArray(response.data) ? response.data : [],
    //   });
    // }
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === '/') {
    //       dispatch({ type: 'fetchList',payload:query });
    //     }
    //   });
    // },
  },
};
