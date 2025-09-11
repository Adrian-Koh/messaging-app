import { useState, useEffect } from "react";
import styles from "./ChatPanel.module.css";
import { getUserChats, submitChat } from "./user-chats";

export const ChatPanel = ({ otherUser = null }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  const getUserChatsCb = async () => {
    if (otherUser) {
      const chats = await getUserChats(otherUser.id);
      setChats(chats);
    } else {
      setChats([]);
    }
  };

  useEffect(() => {
    getUserChatsCb();
  }, [otherUser]);

  async function handleSendClick() {
    await submitChat(otherUser.id, message);
    setMessage("");
    await getUserChatsCb();
  }

  return (
    <div className={styles.chatPanel}>
      <h2>Chat</h2>
      <div className={styles.chatContainer}>
        {otherUser ? (
          <>
            <h3>Chatting with: {otherUser.username}</h3>

            {chats && chats.length > 0 ? (
              <ul className={styles.chats}>
                {chats.map((chat) => (
                  <li>
                    {chat.sender.username} says: {chat.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No chats currently.</p>
            )}

            <div className={styles.chatInput}>
              <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <input type="button" value="Send" onClick={handleSendClick} />
            </div>
          </>
        ) : (
          <p>Select a user to chat with!</p>
        )}
      </div>
    </div>
  );
};
