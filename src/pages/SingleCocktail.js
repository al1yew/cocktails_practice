import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [cocktail, setCocktail] = useState(null);

    const axiosCocktail = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(url + id);

            if (data.drinks) {
                const {
                    strDrink: name,
                    strDrinkThumb: image,
                    strAlcoholic: info,
                    strCategory: category,
                    strGlass: glass,
                    strInstructions: instructions,
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                } = data.drinks[0];

                const ingredients = [
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                ];

                const newCocktail = {
                    name,
                    image,
                    info,
                    category,
                    glass,
                    instructions,
                    ingredients,
                };

                setCocktail(newCocktail);
            } else {
                setCocktail(null);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        axiosCocktail();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!cocktail) {
        return <h2 className="section-title">NO cocktail!!!</h2>;
    }

    const { name, image, info, category, glass, instructions, ingredients } =
        cocktail;

    return (
        <section>
            <Link to="/" className="btn btn-primary">
                back to home
            </Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink">
                <img src={image} alt={name} />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">name: </span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">category: </span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">info: </span>
                        {info}
                    </p>
                    <p>
                        <span className="drink-data">glass: </span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">instructions: </span>
                        {instructions}
                    </p>
                    <p>
                        <span className="drink-dat">ingredients:</span>
                        {ingredients.map((item, i) => {
                            return item ? <span key={i}>{item},</span> : null;
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SingleCocktail;
