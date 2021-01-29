import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux'
import reduxStore from './store/redux'
import Index from './Redux.jsx';

import { Provider as MobxProvider } from 'mobx-react'
import mobxStore from './store/mobx';
import Mobx from './Mobx.jsx';

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <ReduxProvider store={reduxStore}>
        <Index/>
      </ReduxProvider>
      <MobxProvider store={mobxStore}>
        <Mobx />
      </MobxProvider>
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'))
