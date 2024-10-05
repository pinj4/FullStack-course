import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notification', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return notification !== ''
  ? <div style={style}>
      {notification}
    </div>
  : <div></div>

}

export default Notification