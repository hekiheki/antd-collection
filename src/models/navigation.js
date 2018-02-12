import { queryNavigationList } from '../services/api';

export default {
  namespace: 'navigation',
  state: {
    list: [],
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
      return {...state,payload}
    },
    saveList(state,{ payload }){
      const localList = JSON.parse(localStorage.getItem('list'));
      return {
        ...state,
        list: localList ? localList : payload,
      };
    },
    update(state, { payload }){
      return { ...state, ...payload}
    },
  },
  effects: {
    *fetchList({}, {call,put}){
      const response = yield call(queryNavigationList,'api/navigation');
      yield put({
        type: 'saveList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchList',payload:query });
        }
      });
    },
  },
};
