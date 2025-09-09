import { ChatPanel } from "./ChatPanel/ChatPanel";
import { UsersPanel } from "./UsersPanel/UsersPanel";
import styles from "./ChatPage.module.css";

export const ChatPage = () => {
  return (
    <div className={styles.container}>
      <ChatPanel />
      <UsersPanel />
    </div>
  );
};
