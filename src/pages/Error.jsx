import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/not-found.svg";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh!</h3>
          <p>We cannot seem to find the page you are looking for.</p>
          <Link to="/">Back to home page</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong.</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
