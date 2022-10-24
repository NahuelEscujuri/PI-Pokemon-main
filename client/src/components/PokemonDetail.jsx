import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as action from "../redux/action.js";
import "./styles/detail-style.css";
import imgNotFound from "./imgNotFound.png";
import Loader from "./Loader.jsx";
import '../backgroundColorTypes.css'

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
                            {/* IMG */}
                            <div className="detail-item">
                               {console.log("currentPokemon",currentPokemon)}
                               <img src={!currentPokemon.img?imgNotFound:currentPokemon.img}/>
                            </div>
                            {/* TEXT */}
                            <div className="detail-item">
                              {/* Name */}
                              <div className="detail-item_item">
                                <h1>{currentPokemon.name}</h1>
                              </div>
                              {/* Id */}
                              <div className="detail-item_item detail_id">
                                <h3>ID:</h3>
                                <h3>{currentPokemon.id}</h3>
                              </div>
                              {/* Stats */}
                              <div className="stats-container detail-item_item">
                                <div className="stats-item">
                                  <ul>
                                      <li>Hp:</li>
                                      <li>Attack:</li>
                                      <li>Defense:</li>
                                  </ul>
                                  <ul>
                                      <li> {currentPokemon.hp}</li>
                                      <li> {currentPokemon.attack}</li>
                                      <li> {currentPokemon.defense}</li>
                                  </ul>
                                </div>
                                <div className="stats-item">
                                  <ul>
                                      <li>Speed:</li>
                                      <li>Height:</li>
                                      <li>Weight:</li>
                                   </ul>
                                  <ul>
                                      <li>{currentPokemon.speed}</li>
                                      <li>{currentPokemon.height}</li>
                                      <li>{currentPokemon.weight}</li>
                                   </ul>
                                </div>
                              </div>
                              {/* Types */}
                               <div className="type-container detail-item_item detail_types-container">
                                <h3>TYPES:</h3>
                                <div className="detail_types">
                                   {currentPokemon.types.map(t=>(<p className={t.name}>{t.name}</p>))}
                                </div>
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