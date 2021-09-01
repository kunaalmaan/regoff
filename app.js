const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const helmet = require("helmet");
const url = "mongodb://localhost/HAB_DB";
//const url = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 8080;

require("./config/passport")(passport);

mongoose.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log(err.message);
    else console.log("Successfully connected to DB!");
  }
);

const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const officialRoutes = require("./routes/official.routes");
const registrarRoutes = require("./routes/registrar.routes");
const curr_regRoutes = require("./routes/curr_reg.routes");
const ruleRoutes = require("./routes/rule.routes");
const galleryRoutes = require("./routes/gallery.routes");
const adminUploadRoutes = require("./routes/adminUploads.routes");
const contactRoutes = require("./routes/contact.routes");
const aboutRoutes = require("./routes/about.routes");
const front_frRoutes = require("./routes/front_fr.routes");
const front_offRoutes = require("./routes/front_off.routes");
const front_ruleRoutes = require("./routes/front_rule.routes");

app.use("/regoff/", express.static(__dirname + "/public"));
app.use("/regoff/uploads", express.static(__dirname + "/uploads"));
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(
  session({
    secret: "Once again rusty is the cutest dog",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.set("view engine", "ejs");

//app.get("/", (req, res) => res.redirect("/regoff"));

app.use("/regoff", userRoutes);
app.use("/regoff/fr", front_frRoutes);
app.use("/regoff/off", front_offRoutes);
app.use("/regoff/rule", front_ruleRoutes);
app.use("/regoff/admin", adminRoutes);
app.use("/regoff/admin/rule", ruleRoutes);
//app.use("/regoff/admin/functionary", functionaryRoutes);
app.use("/regoff/admin/official", officialRoutes);
app.use("/regoff/admin/registrar", registrarRoutes);
app.use("/regoff/admin/curr_reg", curr_regRoutes);
app.use("/regoff/admin/uploads", adminUploadRoutes);
app.use("/regoff/admin/gallery", galleryRoutes);
app.use("/regoff/admin/contact", contactRoutes);
app.use("/regoff/admin/about", aboutRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});