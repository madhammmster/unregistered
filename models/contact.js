
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    user_id: String,
    contact_id: String      
})

var Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;