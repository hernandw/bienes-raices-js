import { models } from "../models/userQueries.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { sendEmail } from "../helpers/sendEmailRegister.js";

const home = (req, res) => {
  res.render("home");
};

const registerForm = (req, res) => {
  res.render("register");
};

const loginForm = (req, res) => {
  res.render("login");
};

const about = (req, res) => {
  res.render("about");
};

const forget = (req, res) => {
  res.render("forget");
};

const notFound = (req, res) => {
  res.render("notFound", {
    title: "404 - Página no encontrada",
  });
};

const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  try {
    //Validaciones de campos
    await check("name", "Name is required").notEmpty().run(req);
    await check("email", "Email is required").notEmpty().run(req);
    await check("password", "Password is minimum 6 characters")
      .isLength({ min: 6 })
      .run(req);
    await check("password2", "Passwords do not match")
      .equals(password)
      .run(req);

    //Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        errors: errors.array(),
        old: req.body,
      });
    }
    //Encriptar contraseña
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //creamos el token
    const token =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);

    //enviamos el correo de confirmación

    sendEmail(name, email, token);
    //Registrar usuario
    await models.register(name, email, passwordHash, token);
    res.status(201).render('mensaje',{
        title: 'Gracias por registrarte',
        message: 'Hemos enviado un mensaje de confirmación a tu correo',
        confirmed: false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkToken = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await models.checkToken(token);
    if (user) {
      return res.render("mensaje", {
        title: "Gracias por confirmar tu cuenta",
        message: "Hemos confirmado tu cuenta, ya puedes iniciar sesión",
        confirmed: true,
      });
    } else {
      return res.render("mensaje", {
        title: "Error al confirmar tu cuenta",
        message: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const controller = {
  register,
  home,
  notFound,
  registerForm,
  loginForm,
  about,
  forget,
  checkToken,
};
