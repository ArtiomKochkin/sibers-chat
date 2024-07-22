import { ChatWindow } from "@widgets/ChatWindow";
import { Header } from "@widgets/Header";
import { Sidebar } from "@widgets/Sidebar";
import { useEffect, useState } from "react";
import { socket } from "@shared/api";
import { useLocation, useNavigate } from "react-router-dom";

export const ChatPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users);
    });

    socket.on("currentUser", ({ user }) => {
      setCurrentUser(user);
      setIsAdmin(user.isAdmin);
    });

    socket.on("userRemoved", ({ name }) => {
      if (currentUser && currentUser.name === name) {
        navigate("/");
      } else {
        setUsers((_users) => _users.filter(user => user.name !== name));
      }
    });

  }, [currentUser, navigate]);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const removeUser = (name) => {
    if (isAdmin) {
      socket.emit("removeUser", { name, room: params.room });
    }
  };

  return (
    <div>
      <Header name={params.name} leftRoom={leftRoom}/>
      <ChatWindow params={params} state={state} users={users}/>
      <Sidebar room={params.room} users={users} isAdmin={isAdmin} removeUser={removeUser}/>
    </div>
  );
};