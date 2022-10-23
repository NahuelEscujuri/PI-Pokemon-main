import { Route } from 'react-router-dom';
import './style.css';
import './colorsTypes.css'
import Home from './components/Home';
import Pokemons from './components/Pokemons';
import PokemonDetail from './components/PokemonDetail';
import CreatePokemon from './components/PokemonCreate';
import Nav from './components/Nav';

function App() {
  return (
    <>
    <Route path={"/"} component={Nav}/>
    <Route exact path={"/"} component={Home}/>
    <Route exact path={"/pokemons"} component={Pokemons}/>
    <Route exact path={"/pokemons/create"} component={CreatePokemon}/>
    <Route exact path={"/pokemons/:id"} component={PokemonDetail}/>
    </>
  );
}

export default App;
