const { DataTypes } = require("sequelize");
const db = require("../contexts/cnx");

const TypeCommerces = db.define("typeCommerce", {
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
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});



module.exports = TypeCommerces;