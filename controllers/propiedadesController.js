import { check, validationResult } from "express-validator";
import { models } from "../models/propiedadesQueries.js";
import { generateId } from "../helpers/generateId.js";
import { v4 as uuidv4 } from "uuid";

const admin = async (req, res) => {
  const  id  = req.user;
  
  
  res.render("propiedades/misPropiedades", {
    title: "Mis Propiedades",
    propiedades: await models.findAllPropertybyUser(id),
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
  const {
    id: id = generateId(),
    title,
    description,
    rooms,
    category,
    price,
    parking,
    wc,
    street,
    lat,
    lng,
  } = req.body;

  const user_id = req.user;

  try {
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
    await check("wc")
      .isNumeric()
      .withMessage("El número de baños es obligatorio")
      .run(req);

    await check("street")
      .notEmpty()
      .withMessage("Debes ubicar la calle en el mapa")
      .run(req);

    //validar errores

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

    //guardamos la imagen en el servidor y en la BBDD como enlace
    if (!req.files) {
      return res.render("propiedades/crear", {
        errors: errors.array(),
        old: req.body,
        rooms: ["1", "2", "3", "4"],
        categories: await models.findAllCategory(),
        prices: await models.findAllPrice(),
        errors: [{ msg: "Subir una imagen es obligatorio" }],
      });
    }
    const { image } = req.files;

    const imageName = uuidv4().slice(0, 8);
    const imageUrl = `/uploads/${imageName}.png`;

    image.mv(`./public/uploads/${imageName}.png`);

    const propiedad = {
      id,
      title,
      description,
      rooms,
      category_id: category,
      precio_id: price,
      parking,
      wc,
      street,
      lat,
      lng,
      user_id,
      image: imageUrl,
    };

    const result = await models.createPropiedad(propiedad);
    await res.send("ok");
  } catch (error) {
    console.log("Error code: ", error.code, "\nMessage: ", error.message);
  }
};

export const propiedadesController = {
  admin,
  crear,
  guardar,
};
