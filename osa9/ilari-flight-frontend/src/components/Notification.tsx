import { NotifProps } from "../types";

const Notification = (props: NotifProps) => {
  const message = props.message;

  if (message === '') {
    return null;
  };
  
  return (
    <div className="error">
      {message}
    </div>
  );
};
  
export default Notification;