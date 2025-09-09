import { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import { getAllUsers } from "./users-list";
import { useOutletContext } from "react-router-dom";

export const UsersPanel = () => {
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
    <div className={styles.usersList}>
      {users ? (
        <ul>
          {users.map((user) => (
            <li>{user.username}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
