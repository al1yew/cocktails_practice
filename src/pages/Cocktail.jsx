import Wrapper from "../assets/wrappers/CocktailPage";
import axios from "axios";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(singleCocktailUrl + id);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    await queryClient.ensureQueryData(singleCocktailQuery(id));

    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();

  const { data } = useQuery(singleCocktailQuery(id));

  if (!data) return <Navigate to="/" />;

  const drink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = drink;

  const validIngredients = Object.keys(drink)
    .filter((key) => key.startsWith("strIngredient") && drink[key] !== null)
    .map((key) => drink[key]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back to home
        </Link>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>
            {validIngredients.map((item, index) => {
              return (
                <span className="ing">
                  {item}
                  {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">Instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
