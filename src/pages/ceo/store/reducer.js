import {SET_USER_ID} from './constants'

export default (state, action) => {
  const {type, payload} = action
  switch (type) {
    case SET_USER_ID:
      return {...state, userId: payload}

  }
  console.warn('action error: unknown action type : ' + type)
}
