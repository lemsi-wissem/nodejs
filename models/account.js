var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    Name:String,
    Iban:String,
    Expiry:Date,
    IdentityPhoto:String
});

module.exports = mongoose.model('accounts', Account);