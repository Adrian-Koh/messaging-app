import { ChatPanel } from "./ChatPanel/ChatPanel";
import { UsersPanel } from "./UsersPanel/UsersPanel";
import styles from "./ChatPage.module.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export const ChatPage = () => {
  const [otherUser, setOtherUser] = useState(null);
  const { username } = useOutletContext();
  return (
    <div className={styles.container}>
      {username ? (
        <>
          <ChatPanel otherUser={otherUser} />
          <UsersPanel setOtherUser={setOtherUser} />
        </>
      ) : (
        <h2 className={styles.message}>Log in to start chatting!</h2>
      )}
    </div>
  );
};
