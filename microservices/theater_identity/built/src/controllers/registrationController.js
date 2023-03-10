import { LoginModel } from '../models/loginModel.js';
import jwt from 'jsonwebtoken';
export const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const loginModel = new LoginModel(data);
        const user = await loginModel.register();
        const userId = user.insertedId;
        const maxAge = 60 * 60; // 1 hour in seconds
        const jwtSecret = process.env.jwtSecret || "";
        // generate token for cookie 
        const token = jwt.sign({ userId }, jwtSecret, {
            expiresIn: maxAge, // 1hrs in sec
        });
        //set cookie in browser for later authentication
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 1 hour in ms
        });
        res.status(200).send(user);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
};
