const {DataTypes} = require("sequelize");
const db = require("../contexts/cnx");

const Itbis = db.define("itbis", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

});



module.exports = Itbis;