const {DataTypes} = require("sequelize");
const db = require("../contexts/cnx");
const Users = require("./User");

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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    }
});

// Definir asociaciones
Addresses.belongsTo(Users, { foreignKey: "userId"});

module.exports = Addresses;