import { User } from "@entities/user";
import styles from "./Sidebar.module.css";
import { Search } from "@features/Search";
import { useState } from "react";

export const Sidebar = ({ room, users, isAdmin, removeUser }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.sidebar}>
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