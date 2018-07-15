const express = require('express');
const app = express();
const userRoutes = require('./api/routes/user');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://dori.d311@gmail.com:Doron171182%40@cluster0-shard-00-00-xheus.mongodb.net:27017,cluster0-shard-00-01-xheus.mongodb.net:27017,cluster0-shard-00-02-xheus.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
{
    useMongoClient:true
}
);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Method','PUT,DELETE,GET,POST,PATCH');
        return res.status(200).json({});
    }
    next();
});
app.use('/user', userRoutes);
app.use((req, res, next) => {
    const error = new Error('no found');
    error.status = 404;
    next(error);
});
app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }

    });
});
module.exports = app;