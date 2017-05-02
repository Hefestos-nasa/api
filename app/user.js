// Dependencies
var mongoose        = require('mongoose')

var User            = require('./models/user.js')
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

    app.post('/subscribe/:id', estaLogado, (req, res) => {
       User.findById(req.params.id, (err, user) => {
         user.local.subscribers.push({ email: req.user.local.email, nome: req.user.local.name})

         user.save((err, doc) => {
           res.json({ status: 200, message: 'success' })
         })
       })
    })

    app.post('/unsubscribe/:id', estaLogado, (req, res) => {
      var id
       User.findOne({ '_id' : req.params.id }, (err, user) => {
           id = user.local.subscribers[FindValue(user.local.subscribers, 'email', req.user.local.email)]._id
           if (typeof id !== undefined) {
             user.local.subscribers.remove(id)
             user.save()
             res.json({ status: 200, message: 'success' })
           }
       })
    })

    app.get('/me/change', estaLogado, (req, res) => {
        // TODO Definir nome da pagina que terá as alterações do perfil
    })

    app.put('/me/change', estaLogado, (req, res) => {
       User.findOne({ 'local.email' : req.user.local.email }, (err, user) => {
          if (err) res.json(err)

          user.name = req.body.name
          user.email = req.body.email

          user.save((err) => {
            if (err) res.json(err)

            res.json({ status: 200, message: 'Usuário alterado com sucesso.' })  
          })
       })
    })

    app.get('/me', estaLogado, (req, res) => {
        
        res.render('pages/profile', { user: req.user })
    })

    app.get('/profiles', (req, res) => {

        User.find({}, (err, usuarios) => {
            res.json(usuarios)
        })
    })

    app.get('/profile/:id', (req, res) => {

        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })  

    // route middleware to make sure a user is logged in
    function estaLogado(req, res, next){
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }      
}