//Require Mongoose 
const mongoose = require('mongoose');
//Define a Schema
//const Schema = mongoose.Schema;
// Create User Schema
const UserSchema = new mongoose.Schema({
      id: {
        type: String,
        required: true
      },
      name: { 
        type: String,
        required: true, 
        minlength : 2,     
        maxlength: 20,
        trim: true   
      },
      pw: { 
        type: String,
        required: false  
      },
      email: {
        type: String,
        required: false
      },
      status: {
        type: Number,
        default: 0
      },
      classLists: {
        type: Array,
        default: [{}]
      }
    },
    {
      //choose the collection to find the data from
      collection: 'users'
    }
);
// Create Post Schema
/* const PostSchema = new mongoose.Schema({    
      title: String,    
      postedBy: {        
         type: mongoose.Schema.Types.ObjectId,        
         ref: 'User'    
      },    
      comments: [{        
         text: String,        
         postedBy: {            
           type: mongoose.Schema.Types.ObjectId,            
           ref: 'User'        
         }    
      }]
});

*/
// We then need to create models to use it
module.exports = mongoose.model("User", UserSchema);
//module.exports = mongoose.model("Post", PostSchema);