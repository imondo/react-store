import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Redux.jsx';
import { Provider } from 'react-redux'
import store from './store/redux'

const App = () => {
  return (
    <Provider store={store}>
      <h1>React App</h1>
      <Index/>
    </Provider>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'))
