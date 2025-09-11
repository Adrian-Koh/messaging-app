import { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import { getAllOnlineUsers, getAllUsers } from "./users-list";
import { useOutletContext } from "react-router-dom";

export const UsersPanel = ({ setOtherUser }) => {
  const [users, setUsers] = useState([]);
  const { username } = useOutletContext();

  useEffect(() => {
    const getUsersCb = async () => {
      const otherUsers = (await getAllUsers()).filter(
        (user) => user.username !== username
      );
      const onlineUsers = await getAllOnlineUsers();

      const usersWithOnlineInfo = otherUsers.map((user) => {
        return {
          ...user,
          online: onlineUsers.includes(user.username),
        };
      });
      setUsers(usersWithOnlineInfo);
    };
    getUsersCb();
  }, [username]);

  return (
    <div className={styles.usersPanel}>
      {users && users.length > 0 ? (
        <>
          <h2 className={styles.panelTitle}>Users</h2>
          <ul className={styles.usersList}>
            {users.map((user) => (
              <li className={styles.user} onClick={() => setOtherUser(user)}>
                <div
                  className={styles.onlineStatus}
                  style={
                    user.online
                      ? { backgroundColor: "rgb(120, 180, 30)" }
                      : { backgroundColor: "grey" }
                  }
                ></div>
                {user.username}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
