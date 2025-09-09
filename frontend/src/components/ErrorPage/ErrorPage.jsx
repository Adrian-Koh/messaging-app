import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oh no, this route doesn't exist!</h1>
      <p>
        <Link to="/">
          You can go back to the home page by clicking here, though!
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
