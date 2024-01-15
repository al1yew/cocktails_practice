import { useRouteError } from "react-router-dom";

const SinglePageError = () => {
  const error = useRouteError();

  console.log(error);

  return <div>{error.message}</div>;
  // return <div>There was an error...</div>;
};
export default SinglePageError;
