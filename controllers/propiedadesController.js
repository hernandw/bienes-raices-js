import { models } from "../models/userQueries.js";
import { check, validationResult } from "express-validator";
import { propiedadesModel } from "../models/propiedadesQueries.js";

const admin = (req, res) => {
  res.render("propiedades/misPropiedades", {
    title: "Mis Propiedades",
  });
};

const crear = async (req, res) => {
  res.render("propiedades/crear", {
    title: "Crear Propiedades",
    rooms: ["1", "2", "3", "4"],
    categories: await models.findAllCategory(),
    prices: await models.findAllPrice(),
  });
};

const guardar = async (req, res) => {
  const { title, description, rooms, category, price, parking, wc, street, lat, lng } = req.body;

  const propiedad = {
    title,
    description,
    rooms,
    category_id: category,
    precio_id:price,
    parking,
    wc,
    street,
    lat,
    lng,
  }

  //validamos los campos
  await check("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ max: 200 })
    .run(req);
  await check("rooms")
    .isNumeric()
    .withMessage("El número de habitaciones es obligatorio")
    .run(req);
  await check("category")
    .isNumeric()
    .withMessage("Seleccione una categoría")
    .run(req);
  await check("price")
    .isNumeric()
    .withMessage("Selecciona un rango de precios")
    .run(req);
  await check("parking")
    .isNumeric()
    .withMessage("El número de estacionamiento es obligatorio")	
    .run(req);
  await check("wc").isNumeric().withMessage("El número de baños es obligatorio").run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("propiedades/crear", {
      errors: errors.array(),
      old: req.body,
      rooms: ["1", "2", "3", "4"],
      categories: await models.findAllCategory(),
      prices: await models.findAllPrice(),
    });
  }

  await models.createPropiedad(propiedad);
  res.send("Enviado");
};

export const propiedadesController = {
  admin,
  crear,
  guardar,
};
