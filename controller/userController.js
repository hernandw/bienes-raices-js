import { fechaQuery, registerQuery } from "../model/queries.js";
import { check, validationResult } from "express-validator";

const home = (req, res) => {
  res.send("Home");
};

const about = (req, res) => {
  res.render("about", {
    title: "About",
  });
};

const contact = (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
};

const login = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const registerForm = (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

const forget = (req, res)=>{
  res.render('forget', {
    title: 'Forget Password'
  })
}

const register = async(req, res) => {
  const { name, email, password, password2  } = req.body;
  await check("name").notEmpty().withMessage("Name is required").run(req);
  await check("email").isEmail().withMessage("Email is required").run(req);
  await check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters").run(req);
  await check("password2").equals(password).withMessage("Passwords do not match").run(req);

  let resultado = validationResult(req);
  if(!resultado.isEmpty()){
    return res.render('register', {
      errors: resultado.array(),
      old: req.body
    })
  }
  await registerQuery(name, email, password);
  res.redirect('/login')
 
};

export { home, about, login, register, registerForm, contact, forget };
