import { Message } from "@shared/ui";
import { IMessage } from "@shared/types";
import styles from "./Messages.module.css";

interface Props {
  messages: IMessage[],
  name: string
}

export const Messages = ({ messages, name }: Props) => {
  
  return (
    <div className={styles.messages}>
      {messages.map(({ user, message }, i) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? styles.me : "";
        return (
          <Message 
            key={i} 
            message={message} 
            styleMessage={className}
            name={user.name}
          />
        );
      })}
    </div>
  )
}