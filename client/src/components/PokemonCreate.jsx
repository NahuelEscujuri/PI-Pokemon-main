import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/action.js";
import { Link } from "react-router-dom";
import './styles/form-style.css'
import MultiSelectTag from '../selectTypes.js'

export default function CreatePokemon(){
    let [input,setInput]= React.useState({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        typesName:[]
    })

    function handleChange(e){
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const dispatch = useDispatch();

    const types = useSelector(store => store.types)

    async function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(actions.createPokemon(input));
        setInput({name:"",hp:"",attack:"",defense:"",speed:"",height:"",weight:"",typesName:[]})
    }

    const containerTypesSelect = useRef("containerTypesSelect")
    const typesSelect = useRef("typesSelect")
    console.log("NOW TYPES",containerTypesSelect)
    let tagTypes;
    useEffect(() =>{

        if(tagTypes == null){
            console.log("input.typesName == null", input.typesName == null)
           
        }

        console.log("Types == []",types.length == 0)
        if(types.length == 0)dispatch(actions.getAllTypes()).then(e=>{
            try{
                console.log("LENGTH",Object.keys(containerTypesSelect.current).length)
                setInput((prev)=>({...prev,typesName:new MultiSelectTag(typesSelect.current)}))
                
                console.log("MultiSelectTag",input.typesName);
                console.log("Childs",containerTypesSelect.current.childNodes[2])
    
                containerTypesSelect.current.removeChild(containerTypesSelect.current.childNodes[2])
    
                console.log(Object.keys(containerTypesSelect.current));
            }catch(e){
                console.log("message:",e)
            }
        })
        }, [] )

    return(
        <>
        <div className="center marginTop">
            <h1>Create Pokemon</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                <div className="txt_field">
                        <input type="text" required name={"name"} value={input.name}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Name</label>
                </div>
                <div className="txt_field">
                         <input type="text" required name={"hp"} value={input.hp}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Hp</label>
                </div>
                <div className="txt_field">
                        <input type="text" required name={"attack"} value={input.attack}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Attack</label>
                </div>
                <div className="txt_field">
                        <input type="text" required name={"defense"} value={input.defense}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Defense</label>
                </div>
                <div className="txt_field">
                        <input type="text" required name={"speed"} value={input.speed}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Speed</label>
                </div>
                <div className="txt_field">
                        <input type="text" required name={"height"} value={input.height}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Height</label>
                </div>
                <div className="txt_field">
                        <input type="text" required name={"weight"} value={input.weight}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Weight</label>
                </div>
                {/* <div className="txt_field">
                        <input type="text" required name={"typesName"} value={input.typesName}
                         onChange={(e)=>handleChange(e)}/>
                         <span></span>
                         <label>Types</label>
                        </div> */}
                        <div className="container-typesSelect" id="containerTypesSelect" ref={containerTypesSelect}>
                        {/* {types?(<select name="types" id="typesSelect" ref={typesSelect} multiple onChange={(e)=>console.log(e.target.value)}>
                            <option value='normal'>normal</option>
                            <option value='electrict'>electrict</option>
                            <option value='fighting'>fighting</option>
                            <option value='flying'>flying</option>
                            {types?
                            types.map(t=>(
                            <option value={t.name}>{t.name}</option>
                            ))
                            :undefined}
                        </select>):undefined} */}

                        
                        {types.length!==0?(
                        <select name="types" id="typesSelect" ref={typesSelect} multiple onChange={(e)=>console.log(e.target.value)}>{types?
                            types.map(t=>(
                            <option value={t.name}>{t.name}</option>
                            ))
                            :undefined}
                        </select>):undefined}
                        </div>
                <input type="submit" value="CREATE" className="btn-submit"/>
            </form>
        </div>
        </>
    )
}