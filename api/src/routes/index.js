const { Router } = require('express');
const { Pokemon, Type } = require("../db")
const axios = require('axios');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

async function clearPokemonApi(d){
    let newPokemon = {
        id:"",
        name:"",
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        types:[],
        img:"",
    }
    
    newPokemon.name = d.forms[0].name;
    newPokemon.id = d.id;
    newPokemon.hp = d.stats[0].base_stat;
    newPokemon.attack = d.stats[1].base_stat;
    newPokemon.defense = d.stats[2].base_stat;
    newPokemon.speed = d.stats[5].base_stat;
    newPokemon.height = d.height;
    newPokemon.weight = d.weight;
    d.types.map(t=> newPokemon.types.push(t.type))
    newPokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`;

    return newPokemon
}
async function clearPokemonDb(d){
            const type = await d.getTypes({ attributes: ['name', 'id']})
            d.dataValues={...d.dataValues,types:type};
            return d
}

const allPokemonsDB = async ()=>{
    // tiene que devolver un array de pokemmons con sus tipos
    const Pokemons = await Pokemon.findAll().then(async r=>{
        let newPokemons=[]
        await r.map(async p=> newPokemons.push(clearPokemonDb(p)));
        return await Promise.all(newPokemons).then(result=>{
            try{
                return result
            }catch(e){console.log("pito")}
        },e=> console.log("message:",e))
    })
    return await Pokemons
}
const allPokemonsAPI = async ()=>{
    try{
        let result = await axios("https://pokeapi.co/api/v2/pokemon?limit=40").then(async r=>{
                console.log("pase por la API")    
    
                let pResultApi =[];
    
                for(let i = 0; i < r.data.results.length; i++){
                    pResultApi.push(axios(r.data.results[i].url).then(async d =>{
                        return clearPokemonApi(d.data)
                    }, e=>console.log("message:",e)))
                };
                return await Promise.all(pResultApi).then(r=>{
                    try{
                        return r
                    }catch(e){console.log("pito")}
                },e=> console.log("message:",e))
    
            }, e=>console.log("message:",e))
            return await result
    }catch(e){
        console.log("message:",e)
    }
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons",async (req,res,next)=>{
    //es necesario entrar al resultado y a la url que tiene cada objeto para tener sus stats
    //todo esto se tiene que hacer en un bucle creando un objeto nuevo para pushearlo 
    //en un array

    const{ name, typeData } = req.query;
    console.log("Start get Pokemons");

    try{
        if(name){
            const Pokemons = await Pokemon.findAll();

            if(await Pokemons.find(r=>r.name == name))res.send(await Pokemons.find(r=>r.name == name));
            axios(`https://pokeapi.co/api/v2/pokemon/${name}`).then(async r=>{
                res.send(await clearPokemonApi(r.data));
            }, e=>console.log(e))
        }

        switch(typeData){
            case "db":{
                res.send(await allPokemonsDB())
            }
            case "api":{
                res.send(await allPokemonsAPI());
            }
            default:{
                res.send([...await allPokemonsAPI(),...await allPokemonsDB()])
            }
        }

    }catch(e){
        next(e);
    }
});

router.get("/pokemons/:id",async (req,res,next)=>{

    try{
        const id = req.params.id;

        //Busca Primero en la base de datos y si esta lo Envia 
        const dbPokemons = await Pokemon.findAll({
            where:{
                id:id
            }
        }).then(async r=>{
            return await clearPokemonDb(r[0])
            // console.log("acata");
            // const type = await r[0].getTypes({ attributes: ['name', 'id']})
            // r[0].dataValues={...r[0].dataValues,types:type};
            // return r[0]
        },
         e=>{return false});
        if(dbPokemons)res.send(dbPokemons);

        //De lo contrario Busca en la Api y lo Envia
        else{
            await axios(`https://pokeapi.co/api/v2/pokemon/${id}`).then(async r=>{
                res.send(await clearPokemonApi(r.data));
            }, e=>{console.log(e);})
        }
    }catch(e){
        next(e);
    }
})

router.post("/pokemons",async(req,res,next)=>{
    try{

        const { name,hp,attack,defense,speed,height,weight,typesName } = req.body;
        const newPokemon = await Pokemon.create({ name,hp,attack,defense,speed,height,weight})//,{include:"types"}
        
        //Pasa un array de nombres de Types
        const newType = await Type.findAll({
            where:{
                // Se le tendria que mandar por rl body un Array como este
                // typesName:[{name: "ground"},{name: "electric"}]
                [Op.or]:typesName
            }
        })
        
        await newPokemon.setTypes(newType);
        const type = await newPokemon.getTypes({ attributes: ['name', 'id']})

        res.send({...newPokemon.dataValues, types:type});
    }catch(e){
        next(e);
    }
})

router.get("/types",async(req,res,next)=>{

    let tResultDb;
    
    tResultDb = await Type.findAll()

    await axios(`https://pokeapi.co/api/v2/type`).then(r =>{
        for(let type of r.data.results){
            let name = type.name;
            if(!tResultDb.find(t=>t.name == name))Type.create({name})
        }
    }).catch(e=>console.log("invalid URL"))

    res.send(tResultDb);
})

module.exports = router;
