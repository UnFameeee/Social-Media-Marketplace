import RootRoutes from './common/routes';
// import { ToastContainer } from "react-toastify";

//Thang
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { useEffect } from 'react';
import {
  ToastContainer,
  toast,
  Bounce,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from './socket/socket';
import { SOCKET_EVENT } from './socket/socket.constant';
import Notification from './socket/Notification';

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access 
  );

  const notify = (data) => toast(data);

  useEffect(() => {
    if (accessToken) {
      socket.connect();
      //listening on the event connect to server's socket
      socket.on(SOCKET_EVENT.JOIN_ROOM, (payload) => {
        // setIsConnected(true);
        notify(payload);
      });

      //listening to the event receiving the notification
      socket.on(SOCKET_EVENT.RECEIVE_NOTIFICATION, (NotificationResponseDto) => {

        console.log(NotificationResponseDto);

        const notify = (
          avatar,
          profile_name,
          content,
          notification_type
        ) => {
          toast(
            <Notification
              avatar={avatar}
              profile_name={profile_name}
              content={content}
              notification_type={notification_type}
            />,
            {
              autoClose: 3000,
            }
          );
        };
        notify(NotificationResponseDto.avatar, NotificationResponseDto.profile_name, NotificationResponseDto.content, NotificationResponseDto.notification_type);
      });

      var decoded = jwt_decode(accessToken);
      // COMPULSORY
      // Sending the event to server's socket -> assign this user is online -> this event will be sent when the profile login to the system
      socket.emit(SOCKET_EVENT.JOIN_ROOM, {
        profile_id: decoded.profile.profile_id,
      });
    }

    return () => {
      //Remove the event that you listened
      socket.off(SOCKET_EVENT.JOIN_ROOM);
      socket.off(SOCKET_EVENT.RECEIVE_NOTIFICATION);
    };
  }, [accessToken]);

  return (
    <>
      <RootRoutes />
      <ToastContainer
        hideProgressBar
        autoClose={1000}
        limit={6}
        position="bottom-right"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        transition={Bounce}
        // theme="dark"
      />
    </>
  );
}

export default App;
