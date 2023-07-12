import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs"; //for using partial it is necessary to import hbs module
import session from "express-session";
import flash from "connect-flash";
import fs from "fs";

// Create express app
const app = express();

// Get the current filename and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//templates paths
const templatesPath = path.join(__dirname, "../templates");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// port and ip
const port = 3000;
const ipAdress = "127.0.0.1";

//set template/view engine
app.set("view engine", "hbs");
// changing folder name views to templates
app.set("views", viewsPath);
// Using partials
hbs.registerPartials(partialsPath);

app.use(express.urlencoded({ extended: true }));

// Require the necessary modules and set up session middleware in your Express app:
app.use(
  session({
    secret: "your-secret-key", //In the above code, express-session is used to
    resave: false, // handle user sessions, and connect-flash is used for
    saveUninitialized: false, //displaying flash messages (such as login success or error messages).
  })
);
app.use(flash());

//Implement the login routes and session handling in your Express app:
app.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    // User is logged in, render the website with previous login info
    res.render("index", { username: req.session.username });
  } else {
    // User is not logged in, render the login page
    res.render("login", { message: req.flash("message") });
  }
});

app.post("/login", (req, res) => {
  // Perform login authentication
  const { username, password } = req.body;
  // ...
  if (username == "tausif" && password == "khan") {
    // If login is successful, store user session and redirect to the website
    req.session.isLoggedIn = true;
    req.session.username = username;
    res.redirect("/");
  } else {
    // res.sendFile( path.join(__dirname,"./index.js"))
    res.render("wrongPassword");
  }
});

app.post("/logout", (req, res) => {
  // Clear user session and redirect to the login page
  req.session.destroy();
  res.redirect("/");
});

//rendering dynamic content
app.get("/", (req, res) => {
  res.render("index", {
    name: "Tausif Khan",
  });
});
app.get("/contact", (req, res) => {
  res.status(200).render("contact", {
    name: req.query.name,
    email: req.query.email,
  });
  // saboot
  // http://127.0.0.1:3000/contact?name=Tausif%20Khan&email=khantausif@gmail.com
});

// Configure static file serving
app.use(express.static(path.join(__dirname, "/public")));

// Define routes for homepage and about page static files
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/html/index.html"));
});

app.get("/about", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/html/about.html"));
});
app.get("/contact", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/html/contact.html"));
});

// Define a route to serve your CSS file
app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/css/styles.css"));
});

app.get("/about/*", (req, res) => {
  // hamesha last mai dalna hai
  res.status(404).render("err404", {
    content: "of about",
  });
});
app.get("*", (req, res) => {
  // hamesha last mai dalna hai
  res.status(404).render("err404");
});
// Start the server
// app.listen(port, () => {
//   console.log(`server started at http://${ipAdress}:${port}/`);
// });
app.listen(3000,()=>{
console.log('started');
})