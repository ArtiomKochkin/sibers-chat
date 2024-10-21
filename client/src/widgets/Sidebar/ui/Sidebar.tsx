import { useState } from "react";
import { Search } from "@features/Search";
import { User } from "@entities/user";
import { IUser } from "@shared/types";
import styles from "./Sidebar.module.scss";

interface Props {
  room: string,
  users: IUser[],
  isAdmin: boolean,
  isOpen: boolean,
  removeUser: (name: string) => void
}

export const Sidebar = ({ room, users, isAdmin, isOpen, removeUser }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isMobile = window.innerWidth < 768;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className={`${styles.sidebar} ${isOpen && isMobile && styles.mobile} ${!isOpen && styles.hidden}`}
    >
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <h2 className={styles.title}> {room} </h2>
      <h3 className={styles.subtitle}> Users ({users.length}) </h3>
      <ul>
        {filteredUsers.map((user, i) => (
          <User key={i} user={user} isAdmin={isAdmin} removeUser={removeUser}/>
        ))}
      </ul>
    </div>
  );
};