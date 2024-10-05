import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      console.log('ACTION: ', action)
      const notif = action.payload
      return notif
    },
    clear(state, action){
      return ''
    }
  }
})

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer