# React template

## 状态管理

 - React Redux
 - Mobx
 - Redux-Saga
 - dva

### React Redux

> [官网](https://react-redux.js.org/introduction/quick-start)

单项数据流管理

```
npm install redux react-redux redux-thunk
```

- Provider 

通过 `Provider` 组件来包裹 `app` 可以使得全局来访问我们的 `store`

```jsx
import { Provider } from 'react-redux'
import store from './store'
...
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

- connect

`connect` 连接组件和状态管理

```jsx
import { connect } from 'react-redux'
import { addCount } from './store/redux'

// ReduxDemo 组件

const mapStateToProps = state => {
  return {
    num: state.num.count
  }
}

const mapDispatchToProps = dispatch => ({
  add() {
    dispatch(addCount())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemo)
```

- store 套路

  - 定义常量
  - 定义 `actions`
  - 编写 `reducer`
  - 创建 `store`

```js
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 常量
export const ADD = 'demo/add_conut'

// actions
export const changeCount = ({count}) => ({
  count,
  type: ADD
})
export const addCount = () => {
  return (dispatch, getState) => {
    let _state = getState()
    _state.num.count++;
    dispatch(changeCount(_state.num))
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
    default:
      return state;
  }
}
// store
export default createStore(
  // 模块化 reducer
  combineReducers({
    num: reducer // store 中可以定义不同模块
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
```


### Mobx

> [官网]()
双向数据流绑定
