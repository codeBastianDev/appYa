const { DataTypes } = require("sequelize");
const db = require("../contexts/cnx");
const Roles = require("./Role");

const Users = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Roles,
            key: "id",
        },
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    dni:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

// Definir asociaciones
Users.belongsTo(Roles, { foreignKey: "roleId"});

module.exports = Users;