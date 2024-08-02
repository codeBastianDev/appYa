const {DataTypes} = require("sequelize");
const db = require("../contexts/cnx");
const Commerces = require("./Commerce");
const Categories = require("./Category");

const Products = db.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    commerceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Commerces,
            key: "id",
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories,
            key: "id",
        }
    },
});

Products.belongsTo(Commerces, { foreignKey: "commerceId" });
Products.belongsTo(Categories, { foreignKey: "categoryId" });



module.exports = Products;