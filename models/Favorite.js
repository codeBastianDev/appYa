const {DataTypes} = require("sequelize");
const connection = require("../contexts/AppContext");
const Users = require("./User");
const Commerces = require("./Commerce");

const Favorites = connection.define("favorite", {
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
    commerceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Commerces,
            key: "id",
        }
    },

});

Favorites.belongsTo(Users, { foreignKey: "userId"});
Favorites.belongsTo(Commerces, { foreignKey: "commerceId"});

module.exports = Favorites;