const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {type: "mongodb", useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, ssl: true,
    authSource: "admin" })
    .then(() => console.log("MongoDB server connect"))
    .catch(e => console.log("MongoDB error", e));

const connection = mongoose.connection;

if(!connection){
    console.log("Error connecting MongoDB");
} else {
    console.log("MongoDB database is connected!");
}

connection.once('open', () => {
    console.log("MongoDB database connection is established successfully!");
})

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});