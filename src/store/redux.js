import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 常量
export const ADD = 'demo/add_conut'
export const SUB = 'demo/sub_conut'

// actions
export const changeAddCount = ({count}) => ({
  count,
  type: ADD
})
export const changeSubCount = ({count}) => ({
  count,
  type: SUB
})
export const addCount = () => {
  return (dispatch, getState) => {
    let _state = getState()
    _state.num.count++;
    dispatch(changeAddCount(_state.num))
  }
}

export const subCount = () => {
  return (dispatch, getState) => {
    let _state = getState()
    _state.num.count--;
    dispatch(changeSubCount(_state.num))
  }
}
// reducer
const defaultState = {
  count: 0
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return Object.assign({}, state, { count: action.count });
    case SUB:
      return Object.assign({}, state, { count: action.count });
    default:
      return state;
  }
}
// store
export default createStore(
  // 合并分类 reducer
  combineReducers({
    num: reducer
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
);