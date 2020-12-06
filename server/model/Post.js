import mongoose from 'mongoose'



const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },

    imgUrl: {
        type: String,
       // required: true
    },
    name:{
        type:String
    },
    pic:{
        type:String,
    },
  
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User' 
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            pic:{
                type:String,
            },
       
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

})


const Post = mongoose.model('Post', postSchema)

export default Post;