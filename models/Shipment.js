const { DataTypes } = require("sequelize");
const db = require("../contexts/cnx");
const Orders = require("./Order");
const Users = require("./User");

const Shipments = db.define("shipment", {
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

Shipments.belongsTo(Orders, { foreignKey: 'orderId' });
Shipments.belongsTo(Users, { foreignKey: 'userId' });



module.exports = Shipments;