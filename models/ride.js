
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RideSchema = new Schema({
    user_id: String,
    car_id: String,
    start_time: Date,
    end_time: Date
})

var Ride = mongoose.model('Ride', RideSchema);

module.exports = Ride;