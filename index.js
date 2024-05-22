import express from 'express'
import { engine } from 'express-handlebars'
import routes from './routes/userRouter.js'
const app = express()
const PORT = process.env.PORT || 3000

//configuracion de handlebars
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//middlewares

app.use(express.urlencoded({ extended: true }))

//carpeta public
app.use(express.static('public'))

//routes
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})