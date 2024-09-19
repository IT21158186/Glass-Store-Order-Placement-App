import { jwtDecode } from "../utils/functions.js";

export const loginValidator = async (req, res, next) => {
    try {
        // Access the Authorization header
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader) {

            const token = authorizationHeader.split(' ')[1];
            // console.log('Token:', token);
            const data = jwtDecode(token);

            // Pass the token to the next middleware or route handler
            req.body.userid = data._id; 
            req.role = data.role;

            next();
        }else{
            throw Error('Token is missing, please login again')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
