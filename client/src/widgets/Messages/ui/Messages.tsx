import { RefObject } from "react";
import { Message } from "@shared/ui";
import { IMessage } from "@shared/types";
import styles from "./Messages.module.scss";

interface Props {
  messages: IMessage[],
  name: string,
  innerRef: RefObject<HTMLDivElement>
}

export const Messages = ({ messages, name, innerRef }: Props) => {
  
  return (
    <div className={styles.messages} ref={innerRef}>
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