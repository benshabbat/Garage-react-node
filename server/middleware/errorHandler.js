import { logEvents } from './logger.js'

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages[0] });
    }

    // Handle Mongoose invalid ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Handle duplicate key (unique constraint)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        return res.status(400).json({ message: `${field} already exists` });
    }

    const status = err.status || err.statusCode || res.statusCode || 500;
    const isProd = process.env.NODE_ENV === 'production';

    res.status(status).json({
        message: isProd && status === 500 ? 'Internal server error' : err.message,
    });
}

export default errorHandler



