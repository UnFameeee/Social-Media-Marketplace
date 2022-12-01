import RootRoutes from './common/routes';
// import { ToastContainer } from "react-toastify";

//Thang
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from './socket/socket';
import { SOCKET_EVENT } from './socket/socket.constant';
import Notification from './socket/Notification';
import {
  getAllNotification,
  getAllUnreadNotification,
  getAllFriendNotification,
} from './redux/notifications/notificationAPI';
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );

  const notify = (data) => toast(data);

  function handleNotificationType(type) {
    if (type === 'all') {
      getAllNotification(accessToken, refreshToken, dispatch);
    } else if (type === 'unread') {
      getAllUnreadNotification(accessToken, refreshToken, dispatch);
    } else {
      getAllFriendNotification(accessToken, refreshToken, dispatch);
    }
  }

  useEffect(() => {
    if (accessToken) {
      socket.connect();
      //listening on the event connect to server's socket
      socket.on(SOCKET_EVENT.JOIN_ROOM, (payload) => {
        // setIsConnected(true);
        notify(payload);
      });

      //listening on the event rerender notification popup
      socket.on(SOCKET_EVENT.RERENDER_NOTIFICATION, () => {
        // setIsConnected(true);

        getAllFriendNotification(accessToken, refreshToken, dispatch);
      });

      //listening to the event receiving the notification
      socket.on(
        SOCKET_EVENT.RECEIVE_NOTIFICATION,
        (NotificationResponseDto) => {
          // console.log(NotificationResponseDto);
          handleNotificationType(
            NotificationResponseDto.notification_type
          );

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
          notify(
            NotificationResponseDto.avatar,
            NotificationResponseDto.profile_name,
            NotificationResponseDto.content,
            NotificationResponseDto.notification_type
          );
        }
      );

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
      socket.off(SOCKET_EVENT.RERENDER_NOTIFICATION);
      socket.off(SOCKET_EVENT.RECEIVE_NOTIFICATION);
    };
  }, [accessToken]);
  return (
    <PayPalScriptProvider options={{"client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID}} >
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
    </PayPalScriptProvider>
  );
}

export default App;
