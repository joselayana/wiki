const express = require("express");
const morgan = require('morgan');
const nunjucks = require("nunjucks")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const app = express();
const port = 8080
const routes = require("./routes")
const sequelize = require('./models/db')



app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {
  noCache: true
});

/****** MIDDLEWARES ******/
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({
  extended: true
}));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})
app.use(morgan('combined', {
  stream: accessLogStream
}))

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use("/", routes)
// ******************************** //


sequelize.sync({})
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(port);
    console.log(`Servidor escuchando en el puerto ${port}`);
  })
  .catch(err => console.log(err));