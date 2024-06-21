const admin = (req, res)=>{
    res.render("propiedades/misPropiedades",{
        title: "Mis Propiedades"
    });
}

const crear = (req, res)=>{
    res.render("propiedades/crear",{
        title: "Crear Propiedades",
        rooms: ["1","2","3","4"],
    });
}

export const propiedadesController = {
    admin,
    crear
}