const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const connection = require("./contexts/AppContext");

//Imports Models


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
connection
  .sync()
  .then((result) => {
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
