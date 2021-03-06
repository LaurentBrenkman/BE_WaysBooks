'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association to user
      book.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });

      // belongs to many transactions
      book.belongsToMany(models.transaction, {
        as: "transactions",
        through: {
          model: "booksPurcahased",
          as: "bridge",
        },
        foreignKey: "idbook",
      });
      // belongs to many category
      book.belongsToMany(models.category, {
        as: "categories",
        through: {
          model: "productCategory",
          as: "bridge",
        },
        foreignKey: "idbook",
      });
    }
  }
  book.init({
    title: DataTypes.STRING,
    publication: DataTypes.DATE,
    pages: DataTypes.STRING,
    isbn: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    bookAttachment: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};