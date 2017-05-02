// Dependencies
var schedule 	= require('node-schedule');
var mongoose 	= require('mongoose')
var User 		= require('./models/user.js')
var Noticia 	= require('./models/noticia.js')
var Categoria     = require('./models/categoria.js')
var notificacao = require('./notificacao.js')

var Schema 		= mongoose.Schema
var moment 		= require('moment')

exports.AgendarPostagem = () => {
    var rule = new schedule.RecurrenceRule();
    rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];    

    var j = schedule.scheduleJob(rule, function() {

        Noticia.find({ 'data': moment().format('YYYY-MM-DD HH:mm:ss') }, (err, noticia) => {
            console.log(noticia[0])
          if(typeof noticia[0] !== 'undefined') {
            console.log(noticia[0].informacoes.categoria)
            Categoria.find({ 'nome': noticia[0].informacoes.categoria }, (err, categoria) => {

                let notificacaoOpts = {
                    from: 'Portal Nasa',
                    to: '',
                    subject: 'Uma nova noticia foi adicionada.',
                    text: ''
                }

                for (var i = 0; i < categoria[0].subscribers.length; i++) {
                    notificacaoOpts.to = categoria[0].subscribers[i].email
                    notificacaoOpts.html = '<b><h1>Olá ' + categoria[0].subscribers[i].nome + ', tudo bem?</h1></b><b><h2>Estamos passando para te avisar que adicionamos uma nova noticia de seu interesse, espero que você goste!!</h2></b>'
                    notificacao(notificacaoOpts)
                }     
            })

          }
        })
    })
}

