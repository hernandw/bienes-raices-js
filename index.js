import express from 'express'
import routes from './routes/router.js'
const app = express()
const PORT = process.env.PORT || 3000

//configuracion de handlebars
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//routes
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})