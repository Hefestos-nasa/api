// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our Noticia model
var noticiaSchema = mongoose.Schema({

    data: String,
    informacoes: {
        nome: String,
        descricao: String,
        categoria: String
    }

});

// generating a hash
noticiaSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
noticiaSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for Noticias and expose it to our app
module.exports = mongoose.model('Noticia', noticiaSchema);