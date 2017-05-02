// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our Noticia model
var categoriaSchema = mongoose.Schema({

    nome: String,
    subscribers: [{
	        email: String,
	        nome: String
	}],
    noticias: [{
    	id: String,
    	nome: String
    }]

});

// generating a hash
categoriaSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
categoriaSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for Noticias and expose it to our app
module.exports = mongoose.model('Categoria', categoriaSchema);