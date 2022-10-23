import { useState, useEffect } from "react";

export const usePokemon = ()=>{
    const [ isLoading, setisLoading ] = useState(true);
    const [ pokemons, setPokemons] = useState([]);

    return {
        isLoading,
        pokemons
    }
}