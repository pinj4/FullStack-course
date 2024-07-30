const Notification = ({ errorMessage, message }) => {
    const messageType = errorMessage ? "error" : "notif"

    if (message === null) {
      return null
    }
  
    return (
      <div className={messageType}>
        {message}
      </div>
    )
  }
  
  export default Notification