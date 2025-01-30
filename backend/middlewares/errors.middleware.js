
const ApiError = require('../utils/ApiError');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

// module.exports = (err, req, res, next) => {
//     let error = { ...err };

//     error.message = err.message || 'Internal Server Error';
//     error.statusCode = err.statusCode || 500;

//     if (err.name === 'ValidationError') {
//         // Extract readable validation messages
//         const messages = Object.values(err.errors)
//             .map((error) => error.message)
//             .join(', ');
//         error = new ApiError(messages, 400);
//     }

//     if (process.env.NODE_ENV === 'DEVELOPMENT') {
//         return res.status(error.statusCode).json({
//             success: false,
//             message: error.message,
//             stack: process.env.NODE_ENV === 'DEVELOPMENT' ? err.stack : undefined,
//         });
//     }

//     if (process.env.NODE_ENV === 'PRODUCTION') {
//         return res.status(error.statusCode).json({
//             success: false,
//             message: error.message || 'Internal Server Error',
//         });
//     }

//     next();
// };






module.exports = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message || 'Internal Server Error';
    error.statusCode = err.statusCode || 500;

    // Specific error handlers
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`;
        error = new ApiError(400, message);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message).join(', ');
        error = new ApiError(400, message);
    }

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        return res.status(error.statusCode).json({
            success: false,
            error,
            message: error.message,
            stack: err.stack,
        });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }

    next();
};
