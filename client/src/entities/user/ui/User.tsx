import { IoPersonCircleOutline } from "react-icons/io5";
import { RemoveUser } from "@features/RemoveUser";
import { IUser } from "@shared/types";
import styles from "./User.module.scss";

interface Props {
  user: IUser,
  isAdmin: boolean,
  room: string
}

export const User = ({ user, isAdmin, room }: Props) => {
  
  return (
    <li className={styles.user}>
      <div className={styles.info}>
        <IoPersonCircleOutline className={styles.person}/>
        <span> {user.name} </span>
      </div>
      {isAdmin && !user.isAdmin && (
        <RemoveUser 
          room={room}
          user={user}
          isAdmin={isAdmin}
        />
      )}
    </li>
  )
}