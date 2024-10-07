import { useReducer, createContext, useContext } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY":
      console.log('ACTION: ', action)
      return action.payload
    case "CLEAR":
        return ''
    default:
        return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, '')

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifValue = () => {
    const notifAndDispatch = useContext(NotifContext)
    return notifAndDispatch[0]
}
// eslint-disable-next-line react-refresh/only-export-components
export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[1]
}

export default NotifContext