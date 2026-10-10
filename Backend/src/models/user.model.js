import mongoose from 'mongoose'//'module' 

const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        require: true,
        unique: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default:''
    },


},
{
    timestamps:true
}
  
)
const User = mongoose.model('User', userSchema) //.module

export default User; 