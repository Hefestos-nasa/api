// Dependencies
var mongoose        = require('mongoose')

var User            = require('./models/user.js')
var Categoria       = require('./models/categoria.js')
var Schema          = mongoose.Schema

module.exports = (app) => {

  var FindValue = (obj, key, value) => {
    for (var i = 0; i < Object.keys(obj).length; i++) {
      if (obj[i][key] == value) {
        return i
      }
    }
    return null
  }  

    app.post('/assinar-categoria/:id', (req, res) => {
       Categoria.findById(req.params.id, (err, categoria) => {
         categoria.subscribers.push({ email: req.body.email, nome: req.body.name})

         categoria.save((err, doc) => {
           res.json({ status: 200, message: 'success' })
         })
       })
    })

 /* app.post('/desassinar-categoria/:id', estaLogado, (req, res) => {
      var id
       Categoria.findOne({ '_id' : req.params.id }, (err, categoria) => {
           id = categoria.local.subscribers[FindValue(categoria.local.subscribers, 'email', req.categoria.local.email)]._id
           if (typeof id !== undefined) {
             categoria.local.subscribers.remove(id)
             categoria.save()
             res.json({ status: 200, message: 'success' })
           }
       })
    }) */

    // route middleware to make sure a categoria is logged in
    function estaLogado(req, res, next){
        // if categoria is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }      
}