const model = {
  namespace: 'dvamodel',
  state: {
    name: 'model dva',
    count: 0
  },
  reducers: {
    add(state) {
      state.count = state.count + 1
      return {
        ...state
      }
    },
    sub(state) {
      state.count = state.count - 1
      return {
        ...state
      }
    }
  },
  effects: {
    *addCount(action, { call, put }) {
      console.log(action, action.payload) // 拿到传入的 payload
      yield put({type: 'add'})
    },
    *subCount(action, { call, put }) {
      console.log(action, action.payload) // 拿到传入的 payload
      yield put({type: 'sub'})
    }
  },
}

export default model