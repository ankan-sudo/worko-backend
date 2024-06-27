const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const db = require('./config/database');

const app = express();

app.use(express.json());
app.use('/worko', userRoutes);

module.exports = app;
