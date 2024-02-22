const express = require('express');
require('dotenv').config({ debug: process.env.DEBUG });
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');
const { jobScheduler } = require('./controller/cron-job');
require('./queueServices/queue');
const connectDB = require('./database/db');

const app = express();

app.use(cors('*'));
app.use(bodyParser.json({}));

app.use(express.json())

app.use('/api/health', (req, res)=> {
    res.send({message: 'health is working!!'})
})

// // Define Routes
app.use('/api', router);


const PORT = process.env.PORT || 5000;

// Connect Database
connectDB().then(()=> {
    console.log('connected to the database!!')
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    })
    jobScheduler()
    
}).catch(err=> {
    console.log('err in connect to database: ', err);
});