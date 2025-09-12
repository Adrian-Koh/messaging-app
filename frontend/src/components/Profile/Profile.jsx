import { useOutletContext } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user } = useOutletContext();

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.info}>
          {user.photoUrl ? (
            <>
              <img
                src={user.photoUrl}
                className={styles.profilePic}
                alt="profile pic"
              />
              <img src="/pencil.svg" alt="edit" className={styles.editIcon} />
            </>
          ) : null}
          <div className={styles.username}>{user.username}</div>
          <div className={styles.joinDate}>
            Joined on: {new Date(user.joinDate).toDateString()}
          </div>
          <div className={styles.bio}>
            Bio: "<i>{user.bio}</i>"
          </div>
          <img src="/pencil.svg" alt="edit" className={styles.editIcon} />
        </div>
      ) : (
        <h1 className={styles.loggedOutMessage}>You are not logged in.</h1>
      )}
    </div>
  );
};

export { Profile };
