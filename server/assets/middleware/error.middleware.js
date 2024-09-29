const mongoErrorHandler = (err) => {
    if (err.name === 'ValidationError' ||
        err.name === 'CastError' ||
        err.name === 'MongoServerError' ||
        err.name === 'MongoError') {
        return {
            statusCode: 400,
            status: 'error',
            message: err.message,
        };
    }
    return null;
};

const errorMiddleware = (err, _req, res, _next) => {
    console.error('Error:', err.message)
    console.error('Stack:', err.stack)

    const mongoError = mongoErrorHandler(err)
    if (mongoError) {
        const { statusCode, status, message } = mongoError
        res.status(statusCode).json({
            success: false,
            status: status || 'error',
            error: {
                message,
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
            }
        })
    };

    const statusCode = err.statusCode || 500
    const status = err.status || 'error'
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        status,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    })
}

export default errorMiddleware