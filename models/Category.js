const {DataTypes} = require("sequelize");
const db = require("../contexts/cnx");
const Users = require("./User");
const Commerces = require("./Commerce");

const Categories = db.define("category", {
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
            onDelete: "CASCADE",  
            onUpdate: "CASCADE" 
        }
    },
});

Categories.belongsTo(Commerces, { 
    foreignKey: "commerceId", 
});


module.exports = Categories;