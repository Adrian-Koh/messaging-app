import { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import { getAllOnlineUsers, getAllUsers } from "./users-list";
import { useOutletContext } from "react-router-dom";

export const UsersPanel = ({ setOtherUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setError } = useOutletContext();

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((allUsers) => {
        const otherUsers = allUsers.filter(
          (otherUser) => otherUser.username !== user.username
        );
        getAllOnlineUsers()
          .then((onlineUsers) => {
            const usersWithOnlineInfo = otherUsers.map((otherUser) => {
              return {
                ...otherUser,
                online: onlineUsers.includes(otherUser.username),
              };
            });
            setUsers(usersWithOnlineInfo);
            setLoading(false);
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  }, [user]);

  return (
    <div className={styles.usersPanel}>
      {loading ? (
        <h2 className={styles.loading}>Loading...</h2>
      ) : users && users.length > 0 ? (
        <>
          <h2 className={styles.panelTitle}>Users</h2>
          <ul className={styles.usersList}>
            {users.map((otherUser) => (
              <li
                className={styles.user}
                onClick={() => setOtherUser(otherUser)}
              >
                <div
                  className={styles.onlineStatus}
                  style={
                    otherUser.online
                      ? { backgroundColor: "rgb(120, 180, 30)" }
                      : { backgroundColor: "grey" }
                  }
                ></div>
                {otherUser.username}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
