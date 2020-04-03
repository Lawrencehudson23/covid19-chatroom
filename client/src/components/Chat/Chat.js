import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket] = useState(() => io("http://localhost:5000"));

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room });

    socket.on("message", message => {
      setMessages(currentMessages => [...currentMessages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => socket.disconnect(true);
  }, [socket]);

  //function for sending messages
  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };
  console.log("message=>" + message, "messages=>" + messages.length);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
