import { useState, useEffect } from "react";
import styles from "./ChatPanel.module.css";
import { getUserChats, submitChat } from "./user-chats";
import { useOutletContext } from "react-router-dom";

export const ChatPanel = ({ otherUser = null }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [msgTime, setMsgTime] = useState("");
  const { user } = useOutletContext();

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

  function handleMessageHover(time) {
    const date = new Date(time);
    const dateTimeString = `${date.toDateString()}, ${date.toLocaleTimeString(
      [],
      { hour12: true }
    )}`;
    setMsgTime(dateTimeString);
  }

  return (
    <div className={styles.chatPanel}>
      <h2 className={styles.otherUser}>
        {otherUser
          ? otherUser.username
          : `Welcome, ${user.username}! Select a user to chat with.`}
      </h2>
      <div className={styles.chatContainer}>
        {otherUser ? (
          <>
            {chats && chats.length > 0 ? (
              <ul className={styles.chats}>
                {chats.map((chat) => (
                  <li
                    className={
                      chat.sender.username === otherUser.username
                        ? styles.otherUserChat
                        : styles.loggedInUserChat
                    }
                    onMouseOver={() => handleMessageHover(chat.sentTime)}
                  >
                    {chat.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Start chatting!</p>
            )}
            <p>{msgTime ? "Message time: " + msgTime : null}</p>
            <div className={styles.chatInput}>
              <input
                type="text"
                className={styles.inputField}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <input
                type="button"
                value="Send"
                className={styles.sendBtn}
                onClick={handleSendClick}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
