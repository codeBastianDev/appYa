const { DataTypes } = require("sequelize");
const connection = require("../contexts/AppContext");
const Orders = require("./Order");
const Users = require("./User");

const Shipments = connection.define("shipping", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: "id",
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        }
    },
    status: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Pokemons.belongsTo(Orders, { foreignKey: 'orderId' });
Pokemons.belongsTo(Users, { foreignKey: 'userId' });

module.exports = Shipments;