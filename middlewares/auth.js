const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        // Remove 'Bearer ' from the token
        const tokenWithoutBearer = token.split(' ')[1];
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token is not valid" });
    }
}

module.exports = auth;


// import jwt from "jsonwebtoken";
// import ErrorHandler from "../utils/errorHandler.js";
// import { catchAsyncError } from "./catchAsyncError.js";
// import { userServices } from "../services/userServices.js";
// const { findUser } = userServices;

// export const isAuthenticated = catchAsyncError(async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) return next(new ErrorHandler("User not logged in..", 401));

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   req.user = await findUser(decoded._id);
//   req.userId = decoded._id;

//   next();
// });

// export const authorizedAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return next(
//       new ErrorHandler(
//         `${req.user.role} is not allowed to access this resource.`
//       )
//     );
//   }

//   next();
// };
