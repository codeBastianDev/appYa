const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const connection = require("./contexts/AppContext");
const sequelize = require("./contexts/AppContext");

//Imports Models
const Itbis = require("./models/Itbis");

// Imports Controllers
const ErrorController = require("./controllers/errorController");

app.engine(
    "hbs",
    engine({
      layoutsDir: "views/layouts/",
      defaultLayout: "main-layout",
      extname: "hbs"
    })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


//Use Controllers
app.use("/", ErrorController.Get404);

// Connection
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();