const express = require("express"),
    redis = require("redis"),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    app = express();

// App configurations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

const redisOptions = {
    host: "localhost",
    port: 6379
};

const client = redis.createClient(redisOptions);

client.on("connect", function () {
    console.log("Redis is ready :)");
});

//Storing Strings
app.post("/storeString", function (req, res) {
    client.set("name", req.body.name, function (err, reply) {
        if (err) return res.status(500).send(err);
        return res.status(200).send(reply);
    });
});

// Get stored string
app.get("/storedString/:value", function (req, res) {
    // For example localhost:3000/storedString/name
    client.get(req.params.value, function (err, reply) {
        if (err) return res.status(500).send(err);
        return res.status(200).send(reply);
    });
});

// Storing hash
app.post("/storeHash", function (req, res) {
    client.hmset("hashSetName", "name", req.body.name, "lastname", req.body.lastname, "location", req.body.location, function (err, reply) {
        if(err) return res.status(500).send(err);
        return res.status(200).send(reply);
    });
});

// Get Stored Hash
app.get("/storedHash/:hashSetName", function(req,res){
    const hasthSetName = req.param("hashSetName");
    client.hgetall(hasthSetName, function(err,reply){
        if(err) return res.status(500).json(err);
        else return res.status(200).json(reply);
    });
});

// Storing List
app.post("/storeList", function(req,res){
    client.rpush(["list", "name", req.body.tech1, req.body.tech2, req.body.tech3], function(err,reply){
        if(err) return res.status(500).json(err);
        // It will return 3
        return res.status(200).json(reply);
    });
});

// Get stored list
app.post("/StoredList", function(req,res){
    client.lrange(req.body.listName, req.body.start, req.body.stop , function(err,reply){
        if(err) return res.status(500).json(err);
        return res.status(200).json(reply);
    });
});

app.listen(3000, function () {
    console.log("app listening on port 3000");
});


