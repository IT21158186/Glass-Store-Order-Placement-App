import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    role:{
        type:String,
        required:true,
        enum:['customer','admin', 'driver', 'delivery']
    },
},{timestamps:true})

//Encrypt the password before saving the document
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Password compare method
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
