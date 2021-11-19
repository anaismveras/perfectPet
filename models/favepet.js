'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favePet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favePet.belongsTo(models.user)
      models.favePet.hasMany(models.note)
    }
  };
  favePet.init({
    animalId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    age: DataTypes.STRING,
    breed: DataTypes.STRING,
    image: DataTypes.STRING,
    gender: DataTypes.STRING,
    descrption: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favePet',
  });
  return favePet;
};