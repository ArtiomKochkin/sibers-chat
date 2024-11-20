import { useRef, useState } from "react";
import { Messages } from "@widgets/Messages";
import { socket } from "@shared/api";
import { Input, Button } from "@shared/ui";
import { IMessage, IParams } from "@shared/types";
import styles from "./ChatWindow.module.scss";

interface Props {
  params: IParams,
  isOpenSidebar: boolean
  state: IMessage[]
}

export const ChatWindow = ({ params, isOpenSidebar, state}: Props) => {
  const [message, setMessage] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null); 
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMobile = window.innerWidth < 768;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) return;
    socket.emit("sendMessage", { message, params });
    setMessage("");

    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      role="region"
      className={`${styles.chat} ${((!isOpenSidebar && !isMobile) || isMobile) && styles.full}`}
    >  
      <Messages 
        messages={state} 
        name={params.name}
        innerRef={messagesRef}
      />
      <form 
        className={`${styles.form} ${!isOpenSidebar && styles.full}`} 
        role="form"
        onSubmit={handleSubmit}
      >
        <Input 
          name="message"
          placeholder="Type a message"
          value={message}
          onChange={handleChange}
          autoComplete="off"
          required
          autoFocus={true}
          innerRef={inputRef}
        />
        <Button type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};