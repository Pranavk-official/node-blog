require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

// DB connection variable
const connectDB = require('./server/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();

// middleware to Pass data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// cookies & session
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    savedUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}))

// Static Folder
app.use(express.static('public'))

// Templating Engine
app.use(expressLayout);
app.set('layout' , './layouts/main')
app.set('view engine' , 'ejs')

app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})