const { DataTypes } = require("sequelize");
const db = require("../contexts/cnx");
const Users = require("./User");
const Addresses = require("./Address");

const AddressesUser = db.define("addressUser", {
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
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Addresses,
            key: "id",
        },
    },
});

AddressesUser.belongsTo(Users, { foreignKey: "userId"});
AddressesUser.belongsTo(Addresses, { foreignKey: "addressId"});

module.exports = AddressesUser;