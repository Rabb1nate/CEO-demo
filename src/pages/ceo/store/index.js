import reducer from './reducer'
import {setUserId} from './actionCreators'
import React, {createContext, useContext, useReducer} from 'react'

const Store = createContext({})

const Contain = (props) => {
  const {children} = props
  const [state, dispatch] = useReducer(reducer, {mock: 1})
  return (
    <Store.Provider value={{state, dispatch}}>
      {children}
    </Store.Provider>
  )
}

const WithRedux = props => {
  const {mapState, mapDispatch, render, others} = props
  const {state, dispatch} = useContext(Store)
  const stateProps = mapState ? mapState(state) : {}
  const dispatchProps = mapDispatch ? mapDispatch(dispatch) : {}
  return (
    <>
      {render(stateProps, dispatchProps, others)}
    </>
  )
}

const con = (mapState, mapDispatch) => {
  return (Ctor) => (
    props => {
      return (
        <WithRedux
          mapState={mapState}
          mapDispatch={mapDispatch}
          others={props}
          render={
            (stateProps, dispatchProps, others) => (
              <Ctor {...stateProps} {...dispatchProps} {...others}/>
            )
          }
        />
      )
    }
  )
}

export {
  reducer,
  setUserId,
  con,
  Contain
}
