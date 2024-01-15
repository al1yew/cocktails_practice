import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation();

  const pageIsLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />
      <section className="page">
        {pageIsLoading ? <div className="loading"></div> : <Outlet />}
      </section>
    </>
  );
};
export default HomeLayout;
