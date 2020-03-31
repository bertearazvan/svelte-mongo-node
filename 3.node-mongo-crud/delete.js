const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/";
let db = "";

process.on("uncaughtException", (err, data) => {
    console.log("critical error, yet system works");
    console.log(data); // set email to system admin
    return;
});

mongoClient.connect(
    mongoUrl, {
        useUnifiedTopology: true
    },
    (err, res) => {
        if (err) {
            console.log("database error");
            return;
        }
        db = res.db("the_company_database");
        //e38a
        const deleteThis = {
            name: "A"
        };
        db.collection("users").deleteOne(deleteThis, (err, res) => {
            if (err) {
                console.log("database error - cannot delete");
                return;
            }
            console.log(res.deletedCount);
        })
    }
);