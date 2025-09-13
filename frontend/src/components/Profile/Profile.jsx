import { useOutletContext } from "react-router-dom";
import styles from "./Profile.module.css";
import { useState, useRef } from "react";
import { editBio, editProfilePic } from "./user-profile";
import { getUserFromToken } from "../../utils/token";

const Profile = () => {
  const { user, setUser, setError } = useOutletContext();
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [editBioActive, setEditBioActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  function handleEditPhoto() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function onFileSelected(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  function handleFileSubmit() {
    if (file) {
      setLoading(true);
      editProfilePic(file)
        .then(() => {
          const updatedUser = getUserFromToken();
          setUser(updatedUser);
          setFile(null);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }

  function handleBioSubmit() {
    if (bio) {
      setLoading(true);
      editBio(bio)
        .then(() => {
          const updatedUser = getUserFromToken();
          setUser(updatedUser);
          setBio("");
          setLoading(false);
          setEditBioActive(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
    setEditBioActive(false);
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : user ? (
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
                accept="image/*"
              />
              {file ? (
                <div className={styles.fileSelected}>
                  <div className={styles.fileName}>Selected: {file.name}</div>
                  <button className={styles.submit} onClick={handleFileSubmit}>
                    Submit
                  </button>
                </div>
              ) : null}
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
            onClick={() => setEditBioActive(true)}
          />
          {editBioActive ? (
            <div className={styles.editBio}>
              <label htmlFor="bio" className={styles.label}>
                Edit bio:{" "}
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </label>
              <button className={styles.submit} onClick={handleBioSubmit}>
                Submit
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <h1 className={styles.loggedOutMessage}>You are not logged in.</h1>
      )}
    </div>
  );
};

export { Profile };
