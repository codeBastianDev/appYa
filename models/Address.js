const {DataTypes} = require("sequelize");
const db = require("../contexts/cnx");

const Addresses = db.define("address", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Addresses;