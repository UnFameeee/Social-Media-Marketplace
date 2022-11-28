import React, { useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = React.createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const token = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );

  const connect = () => {
    const sk = io('ws://localhost:1234', {
      autoConnect: false,
    });

    if (token) {
      // sk.auth = { token };
      sk.connect();
      // sk.auth;
      setSocket(sk);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
