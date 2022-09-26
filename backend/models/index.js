const path = require("path");
const fs = require("fs");
const db = {};

const Sequelize = require("sequelize");

/** Testing database connection starts here
 * public constructor(database: string, username: string, password: string, options: object)
 */
const sequelize = new Sequelize("products_listing_app", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  define: {
    underscored: true, // use underscore in table name if multiple names are given like customer_details
  },
});

const basename = path.basename(__filename); // returns index.js as a basename of a file
const fileNames = fs.readdirSync(__dirname); // returns an array of file names as ['index.js', 'user.js']

// console.log("Base Name: ", basename); // Output: index.js
// console.log("Dir Name: ", __dirname); // Output: C:\Users\DELL-PC\Desktop\zn\zn-backend\models
// console.log("File Names: ", fileNames); // Output: [ 'index.js', 'product_category.js', 'user.js' ]

fileNames
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  ) // filter method returns an array of filtered data based on the condition in it
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize); // calling a function of respected files on the given path
    db[model.name] = model;
  });

console.log("db: ", db); // Output:  { product_category: product_category, user: user }

// Creating Relations between Models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
