'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Map extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Map.init(
    {
      map_name: DataTypes.STRING,
      map_thumb: DataTypes.STRING,
      map_desc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'map',
    }
  )
  return Map
}
