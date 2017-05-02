// Dependencies
var mongoose        = require('mongoose')
var User            = require('./models/user.js')
var Noticia            = require('./models/noticia.js')
var Schema          = mongoose.Schema
var schedule        = require('node-schedule')
var noticia         = require('./noticia')
/*var fs              = require('fs')
var multer          = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})

var upload = multer({ storage: storage })*/

module.exports = (app, passport) => {

    require('./autenticacao.js')(app, passport)

    require('./mail.js')(app)

    require('./user.js')(app)

    require('./categoria')(app)

    require('./api')(app)

    /*  Mudar */
    app.get('/noticia/:id', (req, res) => {
        Noticia.findById(req.params.id, (err, _noticia) => {

            res.json({ status: 200, result: _noticia, categoria: _noticia.informacoes.categoria })
        })
    })

    app.get('/noticias', (req, res) => {
        Noticia.find({}, (err, _noticia) => {

            res.json({ status: 200, result: _noticia })
        })
    })
    /* Mudar */

    noticia.AgendarPostagem()


    function estaLogado(req, res, next){
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.json({ message: 'Usuario nao existe!' })
    } 
     
}