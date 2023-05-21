import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
//https://www.thecocktaildb.com/api.php
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("a");
    const [cocktails, setCocktails] = useState([]);

    //usecallback ptm shto kajdiy raz renderitsa eta funkciya daje esli mi eyo ne zovem, eto je context

    const axiosDrinks = useCallback(async () => {
        setLoading(true);

        try {
            const res = await axios.get(url + search);
            const { drinks } = res.data;

            if (drinks?.length) {
                const newDrinks = drinks.map((d) => {
                    const {
                        idDrink,
                        strDrink,
                        strDrinkThumb,
                        strAlcoholic,
                        strGlass,
                    } = d;

                    return {
                        id: idDrink,
                        name: strDrink,
                        image: strDrinkThumb,
                        info: strAlcoholic,
                        glass: strGlass,
                    };
                });
                setCocktails(newDrinks)
            } else {
                setCocktails([]);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }, [search]);

    useEffect(() => {
        axiosDrinks();
    }, [search, axiosDrinks]);

    return (
        <AppContext.Provider
            value={{
                loading,
                setSearch,
                cocktails
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
