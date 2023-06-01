import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    salary:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    phone:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    Timestamps: true,
},
);

export default mongoose.model('Post', PostSchema);