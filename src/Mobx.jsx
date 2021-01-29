import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'

function MobxDemo({store}) {
  // let [ count, setCount ] = useState(0)
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

// export default MobxDemo
/**
 * 这个 传入的 store 是 App.js 中传入的 props
 *<MobxProvider store={mobxStore}>
 */
export default inject('store')(observer(MobxDemo));