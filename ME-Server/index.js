const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
 
const {NODE_ENV, MONGODB_URI,API_ENDPOINT_NOT_FOUND_ERR, BACKEND_PORT, SERVER_ERR} = require('./config')

//routes
const authRoutes = require("./routes/auth.route.js");
const usersRoutes = require("./routes/users.routes.js");
const projectRoutes = require("./routes/project.route.js");
const strategyRoutes = require('./routes/strategy.route');


//init express app
const app = express();
 
//middlewares

app.use(express.json())

app.use(cors());
app.use(function(req, res, next) {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
        next();
});

// log in development environment 

if (NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan("dev"))
}

//index route
app.get('/', (req,res) => {
    res.status(200).json({
        type : 'success',
        message : 'server is up and running',
        data : null
    })
})

// routes middleware

app.use('/api/auth', authRoutes); 
app.use('/api/project',projectRoutes)
app.use('/api/users', usersRoutes);
app.use('/api/strategy',strategyRoutes);


// page not found error handling middleware

app.use('*', ( req, res, next ) => {
    const error = {
        status : 400,
        message : API_ENDPOINT_NOT_FOUND_ERR,
    };

    next(error);
});

//global error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;

    res.status(status).json({
        type:'error',
        message,
        data,
    })
})

async function main(){
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })

        console.log('Database Successfully Connected')

        app.listen(BACKEND_PORT, () => console.log(`Server listening to port ${BACKEND_PORT}`));

    }catch (error){
        console.log(error);
        process.exit(1)
    }
}

main();
