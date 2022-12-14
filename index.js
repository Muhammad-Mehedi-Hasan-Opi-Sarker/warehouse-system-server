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
        const bookingDatabase = client.db("database").collection("bookingCollection");
        const blogDatabase = client.db("database").collection("blog");

        app.post('/product', async (req, res) => {
            const newUser = req.body;
            const result = await database.insertOne(newUser);
            res.send(result);
        })

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

        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await database.deleteOne(query);
            res.send(result);
        })
        // booking api 
        app.post('/booking/:id', async (req, res) => {
            const booking = req.body;
            const result = await bookingDatabase.insertOne(booking);
            res.send(result);
        })

        app.get('/booking', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await bookingDatabase.find(query).toArray();
            res.send(result);
        })

        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingDatabase.deleteOne(query);
            res.send(result);
        })

        // api for blog
        app.get('/blog', async (req, res) => {
            const query = {};
            const cursor = blogDatabase.find(query);
            const blog = await cursor.toArray();
            res.send(blog);
        })

        app.get('/blog/:id', async(req,res)=>{
            const id = req.params.id;
            const query={_id:(ObjectId(id))};
            const result = await blogDatabase.findOne(query);
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