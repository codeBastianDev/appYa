const {DataTypes} = require("sequelize");
const connection = require("../contexts/AppContext");
const Users = require("./User");

const Addresses = connection.define("address", {
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
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

Addresses.belongsTo(Users, { foreignKey: "userId"});

module.exports = Addresses;