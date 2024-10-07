import { useNotifValue } from '../NotifContext'

const Notification = () => {
  const message = useNotifValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (message !== '') {
    return (
    <div style={style}>
      {message}
    </div>
    )
  }
}

export default Notification