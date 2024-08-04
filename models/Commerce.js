const {DataTypes} = require("sequelize");
const db = require("../contexts/cnx");
const TypeCommerces = require("./TypeCommerce");

const Commerces = db.define("commerce", {
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
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    closeTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    idTypeCommerce:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeCommerces,
            key: "id",
            onDelete: "CASCADE",  
            onUpdate: "CASCADE" 
        }
    },
});

Commerces.belongsTo(TypeCommerces, { foreignKey: "idTypeCommerce"});

module.exports = Commerces;