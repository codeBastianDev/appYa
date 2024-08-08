const { DataTypes } = require("sequelize");
const db = require("../contexts/cnx");
const Products = require("./Product");
const Orders = require("./Order");

const OrderDetails = db.define("orderDetail", { 
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
            onDelete: "SET NULL",  
            onUpdate: "CASCADE" 
        }
    },
});

OrderDetails.belongsTo(Orders, { foreignKey: "orderId" });
OrderDetails.belongsTo(Products, { foreignKey: "productId" });



module.exports = OrderDetails;