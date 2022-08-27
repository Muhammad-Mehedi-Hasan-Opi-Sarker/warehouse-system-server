const express = require('express')
const app = express()
let cors = require('cors');
const port = 5000
require('dotenv').config()

// user name = warehouse
// password= rdsqSCESSge7jeOO

// middleware 
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mory7js.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    
    try {
        const database = client.db("database").collection("productCollection");
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });
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