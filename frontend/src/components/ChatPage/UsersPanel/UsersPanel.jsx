import { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import { getAllOnlineUsers, getAllUsers } from "./users-list";
import { useOutletContext } from "react-router-dom";

export const UsersPanel = ({ setOtherUser }) => {
  const [users, setUsers] = useState([]);
  const { user } = useOutletContext();

  useEffect(() => {
    const getUsersCb = async () => {
      const otherUsers = (await getAllUsers()).filter(
        (otherUser) => otherUser.username !== user.username
      );
      const onlineUsers = await getAllOnlineUsers();

      const usersWithOnlineInfo = otherUsers.map((otherUser) => {
        return {
          ...otherUser,
          online: onlineUsers.includes(otherUser.username),
        };
      });
      setUsers(usersWithOnlineInfo);
    };
    getUsersCb();
  }, [user]);

  return (
    <div className={styles.usersPanel}>
      {users && users.length > 0 ? (
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
