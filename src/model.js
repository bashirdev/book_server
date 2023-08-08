import mongoose from "mongoose";
const DataSchema=mongoose.Schema(
    {
        book_id:{type:Number, default:function(){return Math.floor(Date.now() / 1000)}},
        title:{type:String, requrired:true},
        author:{type:String, requrired:true},
        genre:{type:String, requrired:true},
        email:{type:String, required:true},
        price:{type:String},
        description:{type:String}, 
        
      
    },
    {timestamps:true, versionKey:false}
);
// DataSchema.index({'$**': 'text'});
// DataSchema.index({title: 'text', 'profile.something': 'text'});
DataSchema.index({title: 'text', genre: 'text', author:'text'});
const BookModel=new mongoose.model('books',DataSchema);

export default BookModel