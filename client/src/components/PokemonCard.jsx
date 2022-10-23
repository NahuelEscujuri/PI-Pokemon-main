import * as action from "../redux/action.js"
import React from "react"
import imgNotFound from "./imgNotFound.png";
import { Link } from "react-router-dom";

const PokemonCard = (props)=>{
    return(
        <Link to={`/pokemons/${props.id}`}>
        <div className="card" key="{props.key}">
                 <img src ={!props.img?imgNotFound:props.img}/>
            <div className="card_text">
                 <h3>{props.name}</h3>
                 <b>Type:</b>{props.types.map(t=>(<p className={t.name}>{t.name}</p>))}
            </div>
        </div>
        </Link>
    )
}

export const mapDispatchToProps = {action};

export default PokemonCard;
