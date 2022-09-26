// const Sequelize = require('sequelize');
// const sequelize = require('../db/database');

module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "product_category",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true, // will add underscore in field name of database column instead of storing camel case notation
    }
  );

  ProductCategory.associate = function (model) {
    ProductCategory.hasMany(model.product, {
      as: "product", // alias name of a model
      constraints: true,
      onDelete: "NO ACTION",
      foreignKey: {
        name: "categoryId", // model class field name
        allowNull: false,
      },
    });
  };

  return ProductCategory;
};
