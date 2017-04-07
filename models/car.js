
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema({
    user_id: String,
    brand: String,
    model: String,
    year: String    
})

var Car = mongoose.model('Car', CarSchema);

module.exports = Car;