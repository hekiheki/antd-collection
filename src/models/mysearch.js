
export default {
  namespace: 'mysearch',
  state: {
    optionValue: ['baidu','google','github','sogou','zhihu','bing','stackoverflow'],
    buttonValue: ['baidu','google'],
    searchValue: '',
    selectValue: 'baidu',
  },
  reducers: {
    select (state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {},
  subscriptions: {},
};
