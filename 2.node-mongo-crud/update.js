const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/";
let db = "";

process.on("uncaughtException", (err, data) => {
  console.log("critical error, yet system works");
  console.log(data); // set email to system admin
  return;
});

mongoClient.connect(
  mongoUrl,
  {
    useUnifiedTopology: true
  },
  (err, res) => {
    if (err) {
      console.log("database error");
      return;
    }
    db = res.db("the_company_database");

    const searchFor = {
      name: "CC"
    };

    const changeTo = {
      $set: {
        name: "XX"
      }
    };

    db.collection("users").updateOne(searchFor, changeTo, (err, res) => {
      if (err) {
        console.log("database error - cannot update");
        return;
      }
    });
    console.log(res);
  }
);
