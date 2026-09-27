import mongoose from 'module' 

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
        require: true,
        minilength: 6,
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
const User = mongoose.module('User', userSchema)

export default User; 