import { models } from "../models/userQueries.js";

const admin = (req, res)=>{
    res.render("propiedades/misPropiedades",{
        title: "Mis Propiedades"
    });
}

const crear = async(req, res)=>{
    res.render("propiedades/crear",{
        title: "Crear Propiedades",
        rooms: ["1","2","3","4"],
        categories: await models.findAllCategory(),
        prices: await models.findAllPrice()
    });
}

export const propiedadesController = {
    admin,
    crear
}