const { DataTypes } = require("sequelize");
const db = require("../db/config");

const User = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userCode: {
        type: DataTypes.STRING,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});


module.exports = User;


