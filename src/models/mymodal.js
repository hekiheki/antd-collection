
export default {
  namespace: 'mymodal',
  state: {
    modalVisible: false,
    tags: [],
    itemName: '',
    itemUrl: '',
    selectedTags: [],
    inputVisible: false,
    inputValue: '',
  },
  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state, ) {
      return { ...state, modalVisible: false }
    },
    update(state, { payload }){
      return { ...state, ...payload}
    },
    showInput (state, { payload }) {
      return { ...state, ...payload, inputVisible: true }
    },
    hideInput (state) {
      return { ...state, inputVisible: false }
    },
  },
  effects: {

  },
  subscriptions: {},
};
