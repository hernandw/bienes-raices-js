import { registerQuery } from "../model/queries.js";
import { check, validationResult } from "express-validator";
import { checkEmail, checkToken, checkConfirm } from "../middlewares/checkEmail.js";
import bcrypt from "bcrypt";
import { generateId } from "../helpers/generateId.js";
import { sendEmail } from "../helpers/email.js";

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

const loginForm = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const registerForm = (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

const forget = (req, res) => {
  res.render("forget", {
    title: "Forget Password",
  });
};

const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  await check("name").notEmpty().withMessage("Name is required").run(req);
  await check("email").isEmail().withMessage("Email is required").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .run(req);
  await check("password2")
    .equals(password)
    .withMessage("Passwords do not match")
    .run(req);

  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render("register", {
      errors: resultado.array(),
      old: req.body,
    });
  }

  const existUser = await checkEmail(email);
  
  if (existUser) {
    res.render("register", {
      errors: [{ msg: "Email already exists" }],
      old: req.body
    })
  }else{
    const token = generateId();
    const usuario = {
      name,
      email,
      token
    }
    //enviar correo
    await sendEmail(usuario);

    const passwordHash = await bcrypt.hash(password, 10);
    await registerQuery(name, email, passwordHash, token);
    res.render('mensaje',{
      title: "Cuenta creada con éxito",
      mensaje: "Se ha enviado un correo, verifica tu correo para confirmar tu cuenta"
      
    })
  }
 
};

const confirmar = async(req, res) => {
  const { token } = req.params;
  const usuario =await checkToken(token);
  if (usuario) {
    res.render('confirmar',{
      title: "Cuenta confirmada",
      mensaje: "Tu cuenta ha sido confirmada, ya puedes iniciar sesion",
      errors: false
    })
    await checkConfirm(usuario.email);

  }else{
    res.render('confirmar',{
      title: "Error al confirmar cuenta",
      mensaje: "Tu cuenta no ha sido confirmada, intenta de nuevo",
      errors: true
    })
  }
  
};

export { home, about, loginForm, register, registerForm, contact, forget, confirmar };
