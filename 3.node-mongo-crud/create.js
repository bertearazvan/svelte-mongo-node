const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/";
let db = ''

process.on("uncaughtException", (err, data) => {
    console.log("critical error, yet system works");
    console.log(data) // set email to system admin
    return
})

mongoClient.connect(mongoUrl, {
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        console.log("database error");
        return
    }
    let user = {
        "name": "A"
    }
    db = res.db("the_company_database")
    db.collection("users").insertOne(user, (err, res) => {
        if (err) {
            console.log("error cannot insert");
            return;
        }
        console.log(`inserted id: ${res.insertedId}`)
    })

})