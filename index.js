const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Your Entrance is open...")
})

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.qlguchx.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const collegeCollections = client.db("yourEntrance").collection("colleges");

async function run() {
  try {

    app.get('/allColleges', async(req,res) => {
        const result = await collegeCollections.find().toArray()
        res.send(result)
    })
    app.get('/allColleges/:id', async(req,res) => {
        const id = req.params.id
        console.log(id)
        const query = { _id: new ObjectId(id)}
        const result = await collegeCollections.find(query).toArray()
        res.send(result[0])
    })






    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, (req,res) => {
    console.log("Your Entrance is running on port: " + port)
})