var Message = require('../models/message');

var maxMessages = 50;                           //if >50  -  crop to 50
var data = {
    messages:[]
};
var cropDb = function(){
    while(Message.find().length > maxMessages/2){
        Message.findOneAndDelete(               //remove the oldest message
            { "id" : "0" }
        );
    }
};


// GET

exports.messages = function (req, res) {
    var messages = [];
    Message.find()
        .exec(function(err, msg){
            if(err)console.error(err);
            else {
                console.log('messages received successfully');
                data.messages = msg;
            }
        });
    data.messages.forEach(function (message,i) {
        messages.push({
            id:i,
            username: message.username,
            text:message.text
        });
    });
    res.json({
        message: messages
    });
};

exports.message = function (req, res) {
    Message.find()
        .exec(function(err, msg){
            if(err)console.error(err);
            else {
                console.log('messages received successfully');
                data.messages = msg;
            }
        });
    var id = req.params.id;
    if (id >= 0 && id < data.messages.length) {
        res.json({
            message: data.messages[id]
        });
    } else {
        res.json(false);
    }
};
// POST

exports.addMessage = function (req, res) {
    //data.messages.push(req.body);
    createMessage = function(){
        var newMessage = new Message();
        if(data.messages.length > maxMessages)cropDb();
        newMessage.id = data.messages.length;
        newMessage.username = req.body.username;
        newMessage.text = req.body.text;
        newMessage.save(function(err) {
            if (err){
                console.log('Error in Saving message: '+err);
                throw err;
            }
            console.log('Message saved successful');
            Message.find()
                .exec(function(err, msg){
                    if(err)console.error(err);
                    else {
                        console.log('messages received successfully');
                        data.messages = msg;
                    }
                });
        });
    };
    process.nextTick(createMessage);
    res.json(req.body);
};

// PUT

//no need for now

// DELETE

exports.deleteMessage = function (req, res) {
    Message.find()
        .exec(function(err, msg){
            if(err)console.error(err);
            else {
                console.log('messages received successfully');
                data.messages = msg;
            }
        });
    var id = req.params.id;

    if (id >= 0 && id < data.messages.length) {
        //data.messages.splice(id, 1);
        Message.findOneAndDelete(
            { "id" : id }
        );
        res.json(true);
    } else {
        res.json(false);
    }
};