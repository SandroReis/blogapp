//Carregando modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const path = require('path')
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

//Public
app.use(express.static(path.join(__dirname, "public")))

//Configuration
//Session
app.use(session({
    secret: 'keysessionsecure',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())
//Middleware

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("erro_msg")
    next()
})

//body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//mongoose

mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("conectado ao mongo")
}).catch((err) => {
    console.log("Erro ao se conectar: " + err)
})

//Rotas
app.use('/admin', admin)


//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando! ")
})