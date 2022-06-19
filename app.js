const http = require('http');
const express = require('express');
require('dotenv').config();
const {mongoConnect}=require('./service/mongodb');
const usersRouter = require('./routers/user.router');
const postRouters = require('./routers/post.router');

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
app.use(express.json());

app.use('/user',usersRouter);
app.use('/user',postRouters);

async function startServer(){
    await mongoConnect();
    server.listen(PORT,() => {
        console.log(`Listning on port ${PORT}..`);
    })
};
startServer();


