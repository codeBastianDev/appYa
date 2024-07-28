const {DataTypes} = require("sequelize");
const connection = require("../contexts/AppContext");
const Users = require("./User");
const Commerces = require("./Commerce");

const Categories = connection.define("category", {
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
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    commerceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Commerces,
            key: "id",
        }
    },
});

Categories.belongsTo(Commerces, { foreignKey: "commerceId" });

module.exports = Categories;