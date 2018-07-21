const mongoose=require('mongoose');
const userAdressSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{ type:mongoose.Schema.Types.ObjectId,ref:'User',require:true},
    adress:{type:String,defualt:'yehud'}
});
module.exports=mongoose.model('UserAdress',userAdressSchema)