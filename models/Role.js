const {DataTypes} = require("sequelize");
const connection = require("../contexts/AppContext");

const Roles = connection.define("role", {
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