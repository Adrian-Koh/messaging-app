import { ChatPanel } from "./ChatPanel/ChatPanel";
import { UsersPanel } from "./UsersPanel/UsersPanel";
import styles from "./ChatPage.module.css";
import { useState } from "react";

export const ChatPage = () => {
  const [otherUser, setOtherUser] = useState(null);
  return (
    <div className={styles.container}>
      <ChatPanel otherUser={otherUser} />
      <UsersPanel setOtherUser={setOtherUser} />
    </div>
  );
};
