# React template

## 状态管理

 - React Redux
 - Mobx
 - Redux-Saga
 - dva

### React Redux

> [官网](https://react-redux.js.org/introduction/quick-start)

单项数据流管理

需要下载依赖

```
yarn add redux react-redux redux-thunk
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

> [文档](https://mobx.js.org/README.html)

双向数据流绑定

安装依赖

```shell
yarn add mobx mobx-react
```

`Mobx` 创建 `store` 相对简单

#### `store` 的不同的方式

- 对象方式

```js
import {observable, action, computed, makeAutoObservable, makeObservable } from 'mobx';

// 对象
const store = makeObservable(
  {
    count: 0,
    get double() {
      return this.count * 2;
    },
    addCount() {
      this.count += 1;
    },
    subCount() {
      this.count -= 1;
    }
  },
  // 对属性进行包装，用于标记属性的作用
  {
    count: observable, // 响应属性
    double: computed, // 计算属性
    addCount: action, // action 方法，改变响应属性
    subCount: action
  }
)

export default store
```

`makeObservable` 可以创建一个响应式对象，与 `Vue 3.0` 类似，传入的对象属性也是通过 `Proxy` 代理

`makeAutoObservable` 则更强大，可以自动为对象属性包装函数

```js
import { makeAutoObservable } from 'mobx';

// 对象
const store = makeAutoObservable(
  {
    count: 0,
    get double() {
      return this.count * 2;
    },
    addCount() {
      this.count += 1;
    },
    subCount() {
      this.count -= 1;
    }
  }
)
```

- 类方式

```js
class Store {
  constructor() {
    makeAutoObservable(this)
  }
  count = 0
  get double() {
    return this.count * 2;
  }
  addCount() {
    this.count += 1;
  }
  subCount() {
    this.count -= 1;
  }
}
export default new Store()
```

#### 注入 `store` 与连接组件

在 `App.js` 中注入 `store`

```js
import { Provider } from 'mobx-react'
import store from './store/mobx';
import Mobx from './Mobx.jsx';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Mobx />
      </Provider>
    </div>
  )
}
```

这里的 `Provider` 组件中的 `props` 为 `store`，它是可以任由我们自定义的，而在组件中连接需要传入这个 `props` 变量名

```jsx
import { inject, observer } from 'mobx-react'

function MobxDemo({store}) {
  return (
    <div>
      <h2>Mobx</h2>
      <p>点击数：{store.count}</p>
      <p>计算属性双数：{store.double}</p>
      <button onClick={() => store.addCount()}>点击 +</button>
      <button onClick={() => store.subCount()}>点击 -</button>
    </div>
  )
}

export default inject('store')(observer(MobxDemo));
```

组件通过 `inject` 注入我们需要传入的 `store`，组件通过 `props.store` 属性访问
