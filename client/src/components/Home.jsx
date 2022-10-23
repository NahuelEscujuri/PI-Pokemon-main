import { getAllPokemons } from "../redux/action";
export default function Home(){
    console.log(getAllPokemons())
    getAllPokemons()
    return(
        <>
        <h3>House</h3>
        {console.log("in home")}
        </>
    )
}