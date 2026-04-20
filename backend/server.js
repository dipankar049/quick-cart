const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URL)
.then((result) => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
