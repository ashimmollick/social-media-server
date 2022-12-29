const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

require('dotenv').config();


const app = express()
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ue2o2me.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)
app.get('/', async (req, res) => {
    res.send('social  server is running start')
})
async function run() {
    try {
        const socialMediaPost = client.db('socialMedia').collection('media');


        app.post('/medialPosts', async (req, res) => {
            const medialPosts = req.body;
            const result = await socialMediaPost.insertOne(medialPosts);
            res.send(result);
        });
        app.get('/medialPosts', async (req, res) => {
            const query = {};
            const posts = await socialMediaPost.find(query).toArray();
            res.send(posts);
        })







    }
    finally {

    }
}
run().catch(console.log)

app.listen(port, () => console.log(`social media running on ${port}`))