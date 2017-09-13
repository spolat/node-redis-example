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

app.listen(3000, function () {
    console.log("app listening on port 3000");
});


