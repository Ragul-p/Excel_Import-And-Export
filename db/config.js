const { Sequelize } = require("sequelize");

const db = new Sequelize("excel", "postgres", "root", {
    host: "localhost",
    dialect: "postgres",
    logging: false
},);


db.sync()
    .then(() => { console.log("db sync success"); })
    .catch(() => { console.log("db sync failed"); });


module.exports = db;