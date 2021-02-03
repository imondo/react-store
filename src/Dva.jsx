import React from 'react'
import { connect } from 'dva'

function DvaDemo({dvamodel, dispatch}) {
  console.log(dvamodel)
  return (
    <div>
      <h2>Dva</h2>
      <p>点击数：{dvamodel.count}</p>
      <button onClick={() => dispatch({
        type: 'dvamodel/addCount',
        payload: 1
      })}>点击 +</button>
      <button onClick={() => dispatch({
        type: 'dvamodel/subCount',
        payload: 1
      })}>点击 -</button>
    </div>
  )
}

export default connect((props) => props)(DvaDemo);