var mongoose = require('mongoose');

module.exports = mongoose.model('Message',{
    id: String,
    username: String,
    text: String
});