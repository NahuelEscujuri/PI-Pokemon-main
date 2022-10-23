import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as action from "../redux/action.js";
import "./styles/detail-style.css";
import imgNotFound from "./imgNotFound.png";
import Loader from "./Loader.jsx";

const PokemonDetail =(props) => {
    const [ currentPokemon, setCurrentPokemon] = useState([])
    const [ currentId, setCurrentId] = useState(-1)

    let {id} =useParams()
  
    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemonDetail)
    console.log("declarado el pokemon",pokemon)

    useEffect(()=>{
        if(currentId !== id){
            dispatch(action.getPokemonDetails(id))
            setCurrentId(id);
            console.log("obtuvimos el ID", currentId)
        }
        if(pokemon){
            console.log("if de pokemon",pokemon);
            setCurrentPokemon(pokemon)
        }
    })

    try{
        return (
            <div> 
                {console.log("current ID", currentId)}
                {console.log("Current Pokemon ID",currentPokemon.id)}
                {console.log("¿Son iguales?",currentPokemon.id == currentId)}
                {
                    currentPokemon.id == currentId?(
                        <div className={`detail-content`}>
                            <div className="detail-item">
                               {console.log("currentPokemon",currentPokemon)}
                               <img src={!currentPokemon.img?imgNotFound:currentPokemon.img}/>
                            </div>
                            <div className="detail-item">
                              <div>
                                <h1>{currentPokemon.name}</h1>
                                {currentPokemon.id}
                              </div>
                               <ul className="stats-container">
                                   <li>Hp: {currentPokemon.hp}</li>
                                   <li>Attack: {currentPokemon.attack}</li>
                                   <li>Defense: {currentPokemon.defense}</li>
                                   <li>Speed: {currentPokemon.speed}</li>
                                   <li>Height: {currentPokemon.height}</li>
                                   <li>Weight {currentPokemon.weight}</li>
                               </ul>
                               <div className="type-container">
                                   {currentPokemon.types.map(t=>(<p className={t.name}>{t.name}</p>))}
                               </div>
                            </div>
                            
                        </div>
                    ):undefined //<Loader/>
                }
          </div>
        );
  }
  catch(e){
    console.log(`message: ${e}`)
  }

};

export default PokemonDetail;