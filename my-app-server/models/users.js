import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username:  { 
        type: String,
        required: true },
    message: { 
        type: String,
        required: true },
});

const Users = new mongoose.model('Users', usersSchema);
export default Users;