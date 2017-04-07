
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DangerousCarSchema = new Schema({
    car_id: String,
    last_notification_time: Date,
    active: Boolean
})

var DangerousCar = mongoose.model('DangerousCar', DangerousCarSchema);

module.exports = DangerousCar;