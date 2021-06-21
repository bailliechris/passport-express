//Require Mongoose 
const mongoose = require('mongoose');
//Define a Schema
//const Schema = mongoose.Schema;
// Create User Schema
const ClassListSchema = new mongoose.Schema({
      ownerid: {
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
      pupils: { 
        type: Array,
        default: [],
        required: false  
      }
    },
    {
      //choose the collection to find the data from
      collection: 'classes'
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
module.exports = mongoose.model("ClassList", ClassListSchema);
//module.exports = mongoose.model("Post", PostSchema);