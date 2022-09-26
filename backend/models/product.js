// const Sequelize = require('sequelize');
// const sequelize = require('../db/database');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true, // will add underscore in field name of database column instead of storing camel case notation
    }
  );

  Product.associate = function (model) {
    Product.belongsTo(model.product_category, {
      as: "product_category", // alias name of a model
      foreignKey: {
        name: "categoryId", // model class field name
        allowNull: false,
      },
    });
  };

  return Product;
};
