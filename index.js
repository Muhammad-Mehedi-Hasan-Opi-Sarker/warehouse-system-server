const express = require('express')
const app = express()
let cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware 
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mory7js.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
        const database = client.db("database").collection("productCollection");

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = database.find(query)
            const product = await cursor.toArray();
            res.send(product)
        })

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await database.findOne(query);
            res.send(result);
        })

    }

    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log('server conneted')
})