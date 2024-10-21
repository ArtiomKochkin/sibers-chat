import { IoMdClose } from "react-icons/io";
import { socket } from "@shared/api";
import { IUser } from "@shared/types";
import styles from "./RemoveUser.module.scss";

interface Props {
  user: IUser,
  room: string,
  isAdmin: boolean
}

export const RemoveUser = ({ user, isAdmin, room }: Props) => {

  const removeUser = (name: string) => {
    if (isAdmin) {
      socket.emit("removeUser", { name, room: room });
    }
  };

  return (
    <div 
      className={styles.close} 
      onClick={() => removeUser(user.name)}
      title="Remove user"
    >
      <IoMdClose className={styles.remove}/>
    </div>
  )
}