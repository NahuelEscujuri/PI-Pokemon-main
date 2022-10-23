import axios from 'axios'

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_POKEMONS_SEARCH = "GET_ALL_POKEMONS_SEARCH"; 
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";

export const getAllPokemons = (only)=>{
    return function (dispatch){
        return fetch(`http://localhost:3001/pokemons?typeData=${only}`)
        .then((response) => response.json())
        .then(data=>{
            console.log(data);
            dispatch({
                type: GET_ALL_POKEMONS, payload: data
            })
        })
    }
}

export const getAllTypes = ()=>{
    return function (dispatch){
        return fetch(`http://localhost:3001/types`)
        .then((response) => response.json())
        .then(data=>{
            console.log("actions:",data);
            dispatch({
                type: GET_ALL_TYPES, payload: data
            })
        })
    }
}

export const getAllPokemonsSearch = (name)=>{
    return function (dispatch){
        return fetch(`http://localhost:3001/pokemons`)
        .then((response) => response.json())
        .then(data=>{
            console.log(data);
            dispatch({
                type: GET_ALL_POKEMONS, payload: data
            })
        })
    }
}

export function createPokemon(values){
    console.log("Desde el ACTIONS",values);
    return function(dispatch){
        return axios.post(`http://localhost:3001/pokemons`,values)
          .then((data) => {
            console.log("Dispatch",dispatch)
         dispatch({
            type: CREATE_POKEMON, payload: data
         });
      });
     };
}

export const getPokemonDetails = (id)=>{
    return function(dispatch){
        fetch(`http://localhost:3001/pokemons/${id}`)
        .then((response) => response.json())
        .then(dataD=>{
            //console.log("Desde el actions",dataD)
            dispatch({
                type: GET_POKEMON_DETAILS, payload: dataD
            })
        })
    }
}