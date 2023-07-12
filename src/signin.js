// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import hbs from "hbs";
// function UserAuth() {

// const app = express()
// // Require the necessary modules and set up session middleware in your Express app:
// app.use(
//   session({
//     secret: "your-secret-key",    //In the above code, express-session is used to
//     resave: false,               // handle user sessions, and connect-flash is used for 
//     saveUninitialized: false,   //displaying flash messages (such as login success or error messages).
//   })
// );
// app.use(flash());


// //Implement the login routes and session handling in your Express app:
// app.get("/", (req, res) => {
//   if (req.session.isLoggedIn) {
//     // User is logged in, render the website with previous login info
//     res.render("index", { username: req.session.username });
//   } else {
//     // User is not logged in, render the login page
//     res.render("login", { message: req.flash("message") });
//   }
// });

// app.post("/login", (req, res) => {
//   // Perform login authentication
//   const { username, password } = req.body;
//   // ...

//   // If login is successful, store user session and redirect to the website
//   req.session.isLoggedIn = true;
//   req.session.username = username;
//   res.redirect("/");
// });

// app.post("/logout", (req, res) => {
//   // Clear user session and redirect to the login page
//   req.session.destroy();
//   res.redirect("/");
// });
// }


// export default UserAuth;