
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = new Schema({
    ride_id: String,
    time: { type : Date, default: Date.now },
    type: String,
    value: String
})

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;