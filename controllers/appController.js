const home = (req, res) => {
    res.render("home",{
        title: "Home Page",
      
      
    });
}

const notFound = (req, res) => {
    res.render("notFound", {
      title: "404 - Página no encontrada",
    });
  };

export const controller = {
    home,
    notFound
}