import {useReducer, useEffect} from 'react'
import Service from "./Service";

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_FETCHING':
      return {
        ...state,
        loading: true
      }
    case 'ERROR_FETCHIG':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'SUCCESS_FETCHING':
      return {
        ...state,
        res: action.payload,
        loading: false
      }
    case 'DONE_FETCHING':
      return {
        ...state,
        loading: false
      }
    case 'CANCEL_FETCHING':
      return {
        ...state,
        loading: false,
        abort: true
      }
  }
}
export default function useRequest({url, method, data = {}}) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    err: null,
    res: null,
    abort: false
  })
  const cancel = () => dispatch({type: 'CANCEL_FETCHING'})
  useEffect(() => {
    const config = method.toLowerCase() === 'post'
      ? {...data}
      : {params: {...data}}
    const request = async () => {
      dispatch({type: 'START_FETCHING'})
      if (!state.abort) {
        try {
          let res = await Service[method](url, config)

          if (!state.abort) {
            dispatch({type: 'SUCCESS_FETCHING', payload: res.data})
          } else {
            dispatch({type: 'DONE_FETCHING'})
          }
        } catch (e) {
          dispatch({type: 'ERROR_FETCHING', payload: e})
        }
      }
    }
    request()
  }, [dispatch])

  return [state, cancel]
}
