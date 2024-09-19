import UserModel from "../models/UserModel.js";
import { jwtSign } from "../utils/functions.js";


export const registerUser = async (req, res) => {
    const data = req.body;
    try {
        if (!data?.email || !data?.password || !data?.firstName || !data?.lastName || !data?.mobile || !data?.role) {
            throw Error('one or more field is missing');
        }
        const isExist = await UserModel.findOne({email:data.email});
        if(isExist){
            throw Error('email already exist')
        }
        const user = await UserModel.create(data);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

export const loginUser = async (req, res) => {
    const data = req.body;
    try {
        if (!data.email) {
            throw Error('email is required')
        }
        if (!data.password) {
            throw Error('password is required')
        }

        const isExist = await UserModel.findOne({ email: data.email });

        if (!isExist) {
            throw Error('account not exist')
        }

        if (!await isExist.isPasswordMatched(data.password)) {
            throw Error('password incorrect')
        }
        const user = isExist.toObject();
        delete user.password;
        const token = jwtSign({ _id: user._id, role: user.role });
        user.token = token;

        res.cookie('token', token, {
            httpOnly: true, // cookie inaccessible to client-side scripts, enhancing security
            expiresIn: new Date(Date.now() + 86400 * 1000), // 1 day
        });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const {role} = req.query || 'customer';
        if(role){
            const allUsers = await UserModel.find({role}).select('-password');
            res.status(200).json(allUsers);
            return
        }
        const allUsers = await UserModel.find().select('-password');
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const getOneUser = async (req, res) => {
    const {id} = req.params
    try {
        const us = await UserModel.findById(id).select('-password')
        res.status(200).json(us);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getLoggedUser = async (req, res) => {
    const {userid} = req.body
    try {
        const us = await UserModel.findById(userid).select('-password')
        res.status(200).json(us);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const delOneUser = async (req, res) => {
    const {id} = req.params
    try {
        const us = await UserModel.findByIdAndDelete(id).select('-password');
        res.status(200).json(us);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateOneUser = async (req, res) => {
    const {id} = req.params
    const data = req.body
    try {
        const us = await UserModel.findByIdAndUpdate(id,data,{new:true}).select('-password');
        res.status(200).json(us);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

