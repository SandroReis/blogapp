//Carregando modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const path = require('path')
const mongoose = require("mongoose")

//Public
app.use(express.static(path.join(__dirname,"public")))

//Configurações

//body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//mongoose

mongoose.connect("mongodb://localhost/blogapp").then(()=>{
    console.log("conectado ao mongo")
}).catch((err)=>{
    console.log("Erro ao se conectar: "+err)
})

//Rotas
app.use('/admin',admin)


//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando! ")
})