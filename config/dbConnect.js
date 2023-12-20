const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const dbConnect = () =>{
    const uri = process.env.DB_ACCESS;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


const db = client.db("xeducation");
return db;
}

module.exports = dbConnect;

