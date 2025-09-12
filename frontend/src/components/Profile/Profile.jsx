import { useOutletContext } from "react-router-dom";
import styles from "./Profile.module.css";
import { useState, useRef } from "react";
import { editProfilePic } from "./user-profile";

const Profile = () => {
  const { user, setUser } = useOutletContext();
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  function handleEditPhoto() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  async function onFileSelected(e) {
    const updatedUser = await editProfilePic(e.target.files[0]);
    setUser(updatedUser);
  }

  function handleEditBio() {}

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
              <img
                src="/pencil.svg"
                alt="edit"
                className={styles.editIcon}
                onClick={handleEditPhoto}
              />
              <input
                type="file"
                onChange={onFileSelected}
                style={{ display: "none" }}
                ref={fileRef}
              />
            </>
          ) : null}
          <div className={styles.username}>{user.username}</div>
          <div className={styles.joinDate}>
            Joined on: {new Date(user.joinDate).toDateString()}
          </div>
          <div className={styles.bio}>
            Bio: "<i>{user.bio}</i>"
          </div>
          <img
            src="/pencil.svg"
            alt="edit"
            className={styles.editIcon}
            onClick={handleEditBio}
          />
        </div>
      ) : (
        <h1 className={styles.loggedOutMessage}>You are not logged in.</h1>
      )}
    </div>
  );
};

export { Profile };
