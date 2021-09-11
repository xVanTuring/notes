const mongodb = require("mongodb")
const uri = "mongodb+srv://sample-hostname:27017/?poolSize=20&writeConcern=majority"
const client = new mongodb.MongoClient(uri)

async function run() {
    await client.connect()
    await client.db("test").command({ ping: 1 })
    const collection = client.db("test").collection("test")
    collection.createIndex({
        name: -1
    }, { name: "query for inventory" }, (error, result) => {

    })

}
run.call(console.dir)
