const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //Acceder a las stadisticas
    //https://pokeapi.co/api/v2/pokemon)
    //.then(r=>  axios(r.result[i].url).then(r=> r.stats[Estadistica]))
    
    hp:{
      type: DataTypes.INTEGER,
      defaultValue: undefined
    },
    attack:{
      type: DataTypes.INTEGER,
      defaultValue: undefined
    },
    defense:{
      type: DataTypes.INTEGER,
      defaultValue: undefined
    },
    speed:{
      type: DataTypes.INTEGER,
      defaultValue: undefined
    },
    height:{
      type: DataTypes.INTEGER,
      defaultValue: undefined
    },
    weight:{
      type: DataTypes.INTEGER,
      defaultValue: undefined
    },

  });
};