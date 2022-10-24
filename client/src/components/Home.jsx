import { Link } from "react-router-dom";
import { getAllPokemons } from "../redux/action";
import imagen from './imgs/img.png'
import './styles/home-style.css'

export default function Home(){
    return(
        <>
        <section class="home container" id="home">
        <img src={imagen}/>
        <div class="home-text">
            <h1>DISCOVER NEW <br/> POKEMONS</h1>
            <Link class="btn" to={"/pokemons"}>Start Now</Link>
        </div>
        </section>
        </>
    )
}