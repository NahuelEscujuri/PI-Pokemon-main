import { getAllPokemons } from "../redux/action";
import React, { Component } from "react";
import { connect } from "react-redux";
import PokemonCard from "./PokemonCard";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export class Pokemons extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          count: 12,
          order: "",
          arrPokemones:[],
          currentCant:40,
          dataType:"",
          isLoading: true
        };
    }

    componentDidMount(){
        console.log("SE ESTA EJECUTANDO componentDidMount")
        //Para saber si los pokemones vienen de la base de datos o de la api
        //NOTA: ver como usar el useEffect() o algo parecido
        this.setState({isLoading: true})

        let {search} = this.props.location;
        let query = new URLSearchParams(search)
        
        console.log("PRINCIPIO query:",query.get("typeData"))
        console.log("PRINCIPIO state:",this.state.dataType)
        console.log("PRINCIPIO arrPokemons:",this.state.arrPokemones.length)
        console.log("PRINCIPIO currentCant:",this.state.currentCant)

        if(this.state.arrPokemones.length !== this.state.currentCant ){
            
            this.props.getAllPokemons(query.get("typeData"))
            .then(e=>{
            this.setState({currentCant:this.state.arrPokemones.length});
            this.setState({dataType: query.get("typeData")})
            this.setState({isLoading: false});
            console.log("Done")
        })}
        else console.log("No se ejecuto el GET")
        if(this.state.arrPokemones.length > 0)this.setState({isLoading: false})
    }

    render(){
        let {search} = this.props.location;
        let query = new URLSearchParams(search)
        console.log("Desde el render el query",query.get("typeData"))
        console.log("Desde el render el state", this.state.dataType)
        console.log("query !== state",query.get("typeData") !== this.state.dataType)

        this.state.arrPokemones = this.props.pokemons;
        let minPage = this.state.count - 12;
        let maxPage = this.state.count;

        const orderchange = e =>{
            if(this.state.order!==e.target.value)this.setState({order: this.state.order = e.target.value}) 
            console.log("Order = ",this.state.order)
        }

        const pagingOfPokemons = ()=>{
            //usar un switch case para ver en que orden se van a mostrar
            switch(this.state.order){
                case "A - Z":{
                    this.state.arrPokemones.sort((a, b)=>{
                        if ( a.name.toLowerCase() < b.name.toLowerCase())return -1
                        if ( a.name.toLowerCase() > b.name.toLowerCase())return 1
                        return 0;
                      })
                      console.log("A - Z in case", this.state.arrPokemones);
                    break
                }

                case "Z - A":
                    this.state.arrPokemones.sort((a, b)=>{
                       if ( a.name.toLowerCase() < b.name.toLowerCase())return 1
                       if ( a.name.toLowerCase() > b.name.toLowerCase())return -1
                       return 0;
                     })
                     console.log("Z - A in case",this.state.arrPokemones)
                    break

                case "Biggest Attack":{
                    this.state.arrPokemones.sort((a, b) => {return b.attack - a.attack;});
                    console.log("More Attack in case", this.state.arrPokemones);
                    break
                }

                case "Minor Attack":{
                    this.state.arrPokemones.sort((a, b) => {return a.attack - b.attack;});
                    console.log("Minor Attack in case", this.state.arrPokemones);
                    break
                }

                default:
                    break
            }

            return this.state.arrPokemones.slice(minPage,maxPage);
        }
        const prevPag = () =>{
            if(minPage > 0){
                this.setState({count: this.state.count - 12})
                window.scrollTo(0, 0);
            }
        }
        const nextPag = ()=>{
            if(maxPage < this.state.arrPokemones.length){
                this.setState({count: this.state.count + 12})
                window.scrollTo(0, 0);
            }
        };

        const DataTypechange = (e)=>{
            if(e.target.value == "all")this.props.history.push(`/pokemons`);
            else this.props.history.push(`/pokemons?typeData=${e.target.value}`);

            if(this.state.dataType!==e.target.value)window.location.reload(false)
        }
        
        const equalQuery = (value)=>{
            if(value == query.get("typeData"))return true
            return false
        }
        return(
            <>
            <div className={`select-container ${this.state.isLoading?"desactive":null}`}>
            {/* <div> */}
            <select name="select" onChange={DataTypechange} className={`${this.state.isLoading?"desactive":null}`}>
                <option value ="all" selected={equalQuery("all")?"selected":null}>
                    All</option>
                <option value ="db" selected={equalQuery("db")?"selected":null}>
                    Data Base</option>
                <option value ="api" selected={equalQuery("api")?"selected":null}>
                    Api</option>
            </select>

            <select name="select" onChange={orderchange} className={`${this.state.isLoading?"desactive":null}`}>
                <option value ="A - Z">A - Z</option>
                <option value ="Z - A">Z - A</option>
                <option value ="Biggest Attack">Biggest Attack</option>
                <option value ="Minor Attack">Minor Attack</option>
            </select>
            {/* </div> */}
            </div>

            {/* Loader */}
            {!this.state.isLoading?undefined:<Loader/>}
            

            {/* Items */}
            <div className="container-cards">
                {
                    this.props.pokemons &&
                    pagingOfPokemons().map((p) =>(
                        p?
                        <PokemonCard
                        name = {p.name}
                        img = {p.img}
                        types = {p.types}
                        id = {p.id}
                        />:undefined))
                }
                
            </div>

            {/* BTNS */}
            <div className={`container-btn ${this.state.isLoading?"desactive":null}`}>
            <ul className="container-btn_pagination">
                <li className={`prev ${minPage > 0?null:"notHover"}`} onClick={prevPag}><span></span></li>
                <li className={`next ${maxPage < this.state.arrPokemones.length?null:"notHover"}`} onClick={nextPag}><span></span></li>
            </ul>
            </div>
            </>
        )
    }
}

export const mapStateToProps = (state) => {
    return{
      pokemons: state.pokemons,
    }
}

export const mapDispatchToProps = { getAllPokemons };

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);