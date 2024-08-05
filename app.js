const express = require("express");
const path = require("path");

const app = express();
const { engine } = require("express-handlebars");
const db = require("./contexts/cnx");
const session = require("express-session");
const flash = require("connect-flash");
const hbs = require("./utils/handlebars");

//Imports Models
const Itbis = require("./models/Itbis");
const Roles = require("./models/Role");
const TypeCommerce = require("./models/TypeCommerce");
const Commerce = require("./models/Commerce");
const Address = require("./models/Address");
const User = require("./models/User");
const AddressUser = require("./models/AddressUser");
const Category = require("./models/Category");
const Favorite = require("./models/Favorite");
const Order = require("./models/Order");
const Shipment = require("./models/shipment");
const Product = require("./models/Product");
const OrderDetail = require("./models/OrderDetail");

// Imports Controllers
const ErrorController = require("./controllers/errorController");
//const roleController = require("./controllers/authController");
//const authController = require("./controllers/roleController");

//Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session({secret:"anything", resave:true, saveUninitialized:true}));

app.use(flash());

app.use((req, res, next) => 
  {
    const errors = req.flash("errors");
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.errorMessage = errors;
    res.locals.userType = req.session.userType;
    res.locals.HasErrorMessage = errors.length > 0;
    next();
  }
);

// Imports Routes
const roleRoute = require("./routes/role");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
const categories = require("./routes/categories");
const product = require("./routes/product");
const commerce = require("./routes/commerce");
const typecommerce = require("./routes/typecommerce");

app.engine(
    "hbs",
    engine({
      layoutsDir: "views/layouts/",
      defaultLayout: "main-layout",
      extname: "hbs"
    })
);

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Use Routes

app.use(roleRoute);
app.use(authRoute);
app.use(homeRoute);
app.use(categories);
app.use(product);
app.use(commerce);
app.use(typecommerce);

//Use Controllers````
//app.use(roleController);
//app.use(authController);
app.use("/", ErrorController.Get404);

//  Sincronizando connection
db.sync()
.then(()=>{
    console.log('Database Connection was successfully'); 

    app.listen('8000',() => {
      console.log('Server is running on port 8000');  //Server is running on port 8000
    });
}).catch(err =>{
    console.error('Database Connection had problems', err);
});