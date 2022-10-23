import { GET_ALL_POKEMONS, CREATE_POKEMON, GET_POKEMON_DETAILS, GET_ALL_TYPES } from "./action";

const initialState ={
    pokemons:[],
    types:[]
}

export default function rootReducer(state = initialState, actions){
    switch(actions.type){
        case CREATE_POKEMON:
            return{
                ...state,
                pokemons:[...state.pokemons, actions.payload]
            }
        
        case GET_ALL_POKEMONS:
            return{
                ...state,
                pokemons: actions.payload
            }

        case GET_ALL_TYPES:
            return{
                ...state,
                types: actions.payload
            }

        case GET_POKEMON_DETAILS:
            return{
                ...state,
                pokemonDetail: actions.payload
            }
        
        default:
            return {...state}
    }
}