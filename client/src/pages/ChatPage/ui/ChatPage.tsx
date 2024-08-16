import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatWindow } from "@widgets/ChatWindow";
import { Header } from "@widgets/Header";
import { Sidebar } from "@widgets/Sidebar";
import { socket } from "@shared/api";
import { IMessage, IParams, IUser } from "@shared/types";

const initialParams = {
  room: "", 
  name: "" 
};

export const ChatPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [params, setParams] = useState<IParams>(initialParams);
  const [state, setState] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null); 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search)) as unknown as IParams;
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

  const removeUser = (name: string) => {
    if (isAdmin) {
      socket.emit("removeUser", { name, room: params.room });
    }
  };

  return (
    <div>
      <Header name={params.name} leftRoom={leftRoom}/>
      <ChatWindow params={params} state={state}/>
      <Sidebar room={params.room} users={users} isAdmin={isAdmin} removeUser={removeUser}/>
    </div>
  );
};