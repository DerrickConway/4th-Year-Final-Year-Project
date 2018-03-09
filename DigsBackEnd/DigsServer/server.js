// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
mongoose.connect('mongodb://localhost/digsdb');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Room = mongoose.model('Room', {
    UID: String,
    AdID: String,
    RoomType: String,
	College: [String],
	Address: String,
    Eircode: String,
    LocationDes: String,
    Price: Number,
    Availability: String,
    Email: String,
    Phone: Number,
    Contact: String,
    Description: String,
    Parking: String,
	ImagesUrl: [String],
});

var Property = mongoose.model('Property', {
    UID: String,
    AdID: String,
    PropertyType: String,
	SingleBeds: Number,
	DoubleBeds: Number,
	TwinBeds: Number,
	EnSuite: Number,
    College: [String],
	Address: String,
    Eircode: String,
    LocationDes: String,
    Price: Number,
    Availability: String,
    Email: String,
    Phone: Number,
    Contact: String,
    Description: String,
    Parking: String,
	ImagesUrl: [String],
});
 
// Routes
 
    // Get rooms
    app.get('/api/rooms', function(req, res) {
 
        console.log("fetching rooms");
 
        // use mongoose to get all rooms in the database
        Room.find(function(err, rooms) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(rooms); // return all rooms in JSON format
        });
    });
	
	// Get Properties
    app.get('/api/properties', function(req, res) {
 
        console.log("fetching properties");
 
        // use mongoose to get all rooms in the database
        Property.find(function(err, properties) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(properties); // return all rooms in JSON format
        });
    });
 
    // create rooms and send back all rooms after creation
    app.post('/api/rooms', function(req, res) {
 
        console.log("creating room");
 
        // create a properties, information comes from request from Ionic
        Room.create({
            UID: req.body.UID,
            AdID: req.body.AdID,
            RoomType: req.body.RoomType,
            College: req.body.College,
            Eircode: req.body.Eircode,
			Address: req.body.Address,
            LocationDes: req.body.LocationDes,
            Price: req.body.Price,
            Availability: req.body.Availability,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Contact: req.body.Contact,
            Description: req.body.Description,
            Parking: req.body.Parking,
			ImagesUrl: req.body.ImagesUrl,
            done : false
        }, function(err, room) {
            if (err)
                res.send(err);
 
            // get and return all the rooms after you create another
            Room.find(function(err, rooms) {
                if (err)
                    res.send(err)
                res.json(rooms);
            });
        });
 
    });
	
	// create properties and send back all properties after creation
    app.post('/api/properties', function(req, res) {
 
        console.log("creating properties");
 
        // create a properties, information comes from request from Ionic
        Property.create({
            UID: req.body.UID,
            AdID: req.body.AdID,
            PropertyType: req.body.PropertyType,
			SingleBeds: req.body.SingleBeds,
			DoubleBeds: req.body.DoubleBeds,
			TwinBeds: req.body.TwinBeds,
			EnSuite: req.body.EnSuite,
            College: req.body.College,
            Eircode: req.body.Eircode,
			Address: req.body.Address,
            LocationDes: req.body.LocationDes,
            Price: req.body.Price,
            Availability: req.body.Availability,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Contact: req.body.Contact,
            Description: req.body.Description,
            Parking: req.body.Parking,
			ImagesUrl: req.body.ImagesUrl,
            done : false
        }, function(err, property) {
            if (err)
                res.send(err);
 
            // get and return all the properties after you create another
            Property.find(function(err, properties) {
                if (err)
                    res.send(err)
                res.json(properties);
            });
        });
 
    });
 
    // delete a room
    app.delete('/api/rooms/:room_id', function(req, res) {
        Room.remove({
            _id : req.params.room_id
        }, function(err, room) {
 
        });
    });
	
	// delete a property
    app.delete('/api/properties/:property_id', function(req, res) {
        Property.remove({
            _id : req.params.property_id
        }, function(err, property) {
 
        });
    });
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");