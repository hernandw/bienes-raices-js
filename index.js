import express from "express";
import { engine } from "express-handlebars";
import userRoutes from "./routes/userRouter.js";
import propiedadesRoutes from "./routes/propiedadesRouter.js";
import cookieParser from "cookie-parser";



const app = express();
const PORT = process.env.PORT || 3000;

//configuracion de handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());






//carpeta public
app.use(express.static("public"));

//routes
app.use("/propiedades", propiedadesRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
