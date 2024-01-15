import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const cocktailurl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const queryFunction = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const res = await axios.get(cocktailurl + searchTerm);
      return res.data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "";

    await queryClient.ensureQueryData(queryFunction(searchTerm));

    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();

  const { data: drinks } = useQuery(queryFunction(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
