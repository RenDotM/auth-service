const Database = require("./db");

class MongoDB extends Database {
    constructor(host, port, name) {
        super(host, port, name);
        this.database_url = `mongodb://${host}:${port}/${name}`;
    }
    connect() {
        const mongoose = require("mongoose");
        this.dbConnection = mongoose
            .connect(this.database_url, {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(() => {
                console.log("Successfully connected to the database");
            })
            .catch(err => {
                console.log("Could not connect to the database. Exiting now...", err);
                process.exit();
            });

        return this.dbConnection.connection;
    }

    createUser(user) {
        // create a product
        let product = new User({
            name: req.body.name,
            price: req.body.price
        });

        // save product in the database.
        product
            .save()
            .then(data => {
                res.send({
                    success: true,
                    message: "User successfully created",
                    data: data
                });
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: err.message || "Some error occurred while creating the user."
                });
            });

    }

    getUserById(userId) {}

    getUsers() {}

    updateUserById(userId, content) {}

    deleteUserById(userId) {}
}