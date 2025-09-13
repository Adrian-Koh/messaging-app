import { useState, useEffect } from "react";
import styles from "./ChatPanel.module.css";
import { getUserChats, submitChat } from "./user-chats";
import { useOutletContext } from "react-router-dom";

export const ChatPanel = ({ otherUser = null }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [msgTime, setMsgTime] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setError } = useOutletContext();

  const fetchChats = () => {
    if (otherUser) {
      setLoading(true);
      getUserChats(otherUser.id)
        .then((chats) => {
          setChats(chats);
          setLoading(false);
        })
        .catch((err) => setError(err.message));
    } else {
      setChats([]);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [otherUser]);

  function handleSendClick() {
    submitChat(otherUser.id, message)
      .then(() => {
        setLoading(true);
        setMessage("");
        fetchChats();
      })
      .catch((err) => setError(err.message));
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
        {loading ? (
          <h3 className={styles.loading}>Loading...</h3>
        ) : otherUser ? (
          <>
            {chats ? (
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
