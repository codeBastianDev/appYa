const { DataTypes } = require("sequelize");
const connection = require("../contexts/AppContext");
const Users = require("./User");
const Itbis = require("./Itbis");
const Commerces = require("./Commerce");
const Addresses = require("./Address");

const Orders = connection.define("order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        }
    },
    itbisId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Itbis,
            key: "id",
        }
    },
    status: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    commerceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Commerces,
            key: "id",
        }
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Addresses,
            key: "id",
        }
    },
});

// Definir asociaciones
Orders.belongsTo(Users, { foreignKey: "userId"});
Orders.belongsTo(Itbis, { foreignKey: "itbisId"});
Orders.belongsTo(Commerces, { foreignKey: "commerceId"});
Orders.belongsTo(Addresses, { foreignKey: "addressId"});

module.exports = Orders;