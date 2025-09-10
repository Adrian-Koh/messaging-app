import { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import { getAllUsers } from "./users-list";
import { useOutletContext } from "react-router-dom";

export const UsersPanel = ({ setOtherUser }) => {
  const [users, setUsers] = useState([]);
  const { username } = useOutletContext();

  useEffect(() => {
    const getAllUsersCb = async () => {
      const allUsers = await getAllUsers();
      const otherUsers = allUsers.filter((user) => user.username !== username);
      setUsers(otherUsers);
    };
    getAllUsersCb();
  }, [username]);

  return (
    <div className={styles.usersPanel}>
      {users ? (
        <>
          <h2 className={styles.panelTitle}>Users</h2>
          <ul className={styles.usersList}>
            {users.map((user) => (
              <li
                className={styles.user}
                onClick={() => setOtherUser(user.username)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
