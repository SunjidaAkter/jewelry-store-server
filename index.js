const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


//use middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mvelq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//require('crypto').randomBytes(64).toString('hex')


async function run() {
    try {
        await client.connect();
        const productsCollection = client.db("jewelry-store").collection("products");


        app.get("/products", async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
    }
    finally { }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running My jwelery ecommerce Server');
});
app.listen(port, () => {
    console.log('jewelry ecommerce Server is running on port :', port)
})