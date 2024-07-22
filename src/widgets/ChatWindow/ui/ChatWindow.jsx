import { Button, Input } from "@shared/ui";
import { useState } from "react";
import styles from "./ChatWindow.module.css";
import { socket } from "@shared/api";
import { Messages } from "@widgets/Messages";

export const ChatWindow = ({ params, state}) => {
  const [message, setMessage] = useState("");
  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = (e) => {
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