import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      console.log('ACTION: ', action)
      return action.payload
    },
    clear(state, action){
      return ''
    }
  }
})

export const { notify, clear } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer