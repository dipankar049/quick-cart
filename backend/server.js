const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then((result) => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
