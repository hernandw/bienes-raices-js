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

const register = (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

const forget = (req, res)=>{
  res.render('forget', {
    title: 'Forget Password'
  })
}

export { home, about, login, register, contact, forget };
