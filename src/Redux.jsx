import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addCount, subCount } from './store/redux'

function ReduxDemo(props) {
  console.log(props)
  const { num, add, sub } = props;
  // let [ count, setCount ] = useState(0)
  return (
    <div>
      <div>{num}</div>
      <button onClick={add}>点击 +</button>
      <button onClick={sub}>点击 -</button>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    num: state.num.count
  }
}

const mapDispatchToProps = dispatch => ({
  add() {
    dispatch(addCount())
  },
  sub() {
    dispatch(subCount())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemo)