import { useState } from "react";
import { Messages } from "@widgets/Messages";
import { socket } from "@shared/api";
import { Input, Button } from "@shared/ui";
import { IMessage, IParams } from "@shared/types";
import styles from "./ChatWindow.module.scss";

interface Props {
  params: IParams,
  state: IMessage[]
}

export const ChatWindow = ({ params, state}: Props) => {
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) return;
    socket.emit("sendMessage", { message, params });
    setMessage("");
  };

  return (
    <div className={styles.chat}>
      <Messages messages={state} name={params.name} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
            name="message"
            placeholder="Type a message"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
            autoFocus={true}
        />
        <Button type="submit" onSubmit={handleSubmit}>Send</Button>
      </form>
    </div>
  );
};