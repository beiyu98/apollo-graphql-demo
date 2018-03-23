const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/graphql",error=>{
    if(error) console.error('mongoose connect error:',error);
});

const db = mongoose.connection;
db.on('error',err=>{
    console.error('mongodb error',err);
});
db.on('open',()=>{
    console.log('mongodb open!');
});
db.on('disconnected',()=>{
    console.warn('mongodb disconnected!');
});

const bookSchema = mongoose.Schema({
    title:String,
    author:String,
});
const BookModel = mongoose.model('Book',bookSchema);

module.exports = {
    BookModel,
}