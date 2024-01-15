import Wrapper from "../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard.jsx";

const CocktailList = ({ drinks }) => {
  console.log(typeof drinks);

  if (!drinks) {
    return <h4 style={{ textAlign: "center" }}>No cocktails found.</h4>;
  }

  const formattedDrinks = drinks.map((drink) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;

    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });

  return (
    <Wrapper>
      {formattedDrinks.map((drink) => {
        console.log(drink);
        return <CocktailCard key={drink.id} {...drink} />;
      })}
    </Wrapper>
  );
};
export default CocktailList;
