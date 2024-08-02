const {DataTypes} = require("sequelize");
const db = require("../contexts/cnx");

const Roles = db.define("role", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = Roles;