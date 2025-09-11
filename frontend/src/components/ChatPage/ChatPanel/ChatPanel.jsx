import { useState, useEffect } from "react";
import styles from "./ChatPanel.module.css";
import { getUserChats } from "./user-chats";

export const ChatPanel = ({ otherUser = null }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getUserChatsCb = async () => {
      if (otherUser) {
        const chats = await getUserChats(otherUser.id);
        setChats(chats);
      } else {
        setChats([]);
      }
    };
    getUserChatsCb();
  }, [otherUser]);

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
          </>
        ) : (
          <p>Select a user to chat with!</p>
        )}
      </div>
    </div>
  );
};
