const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    // This define the object id of the like object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath:'onModel'
    },
    // this field is use for defining the type of the liked object since this is a dynamic reference
    moModel:{
        type: String,
        required: true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;