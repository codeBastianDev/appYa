const { DataTypes } = require("sequelize");
const connection = require("../contexts/AppContext");
const Products = require("./Product");
const Orders = require("./Order");

const OrderDetails = connection.define("orderDetail", { 
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
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: "id",
        }
    },
});

OrderDetails.belongsTo(Orders, { foreignKey: "orderId" });
OrderDetails.belongsTo(Products, { foreignKey: "productId" });

module.exports = OrderDetails;