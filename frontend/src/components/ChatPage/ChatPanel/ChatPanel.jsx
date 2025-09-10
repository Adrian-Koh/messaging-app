import styles from "./ChatPanel.module.css";

export const ChatPanel = ({ otherUser = null }) => {
  return (
    <div className={styles.chatPanel}>
      <h2>Chat</h2>
      {otherUser ? (
        <h3>Chatting with: {otherUser}</h3>
      ) : (
        <p>Select a user to chat with!</p>
      )}
    </div>
  );
};
