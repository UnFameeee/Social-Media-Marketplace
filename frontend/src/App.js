import RootRoutes from "./common/routes";
// import { ToastContainer } from "react-toastify";

//Thang
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import socket from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );

  const notify = (data) => toast(`${data}`);

  useEffect(() => {
    if (accessToken) {
      socket.connect();
      //listening on the event connect to server's socket
      socket.on("join_room", (payload) => {
        setIsConnected(true);
        notify(payload);
      });

      //listening to the event receiving the notification
      socket.on("receive_notification", (payload) => {
        notify(payload);
      });

      var decoded = jwt_decode(accessToken);
      // COMPULSORY
      // Sending the event to server's socket -> assign this user is online -> this event will be sent when the profile login to the system
      socket.emit("join_room", {
        profile_id: decoded.profile.profile_id,
      });
    }

    return () => {
      //Remove the event that you listened 
      socket.off('join_room');
      socket.off('receive_notification');
    };
  }, [accessToken]);

  return (
    // <SocketContext.Provider value={socketIO}>
    <>
      <RootRoutes />
      <ToastContainer />
    </>
    // </SocketContext.Provider>
  );
}

export default App;
