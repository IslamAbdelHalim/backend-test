// function That catch the error
export function catchError(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

// class That Form the error
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

// middleware that catch API or URL Error
export const notFoundErrorHandling = (req, res, next) => {
  return next(
    new AppError(
      `Can not found this url ${req.originalUrl} on this server`,
      404
    )
  );
};

export function globalErrorHandling(err, req, res, next) {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.code === 11000) {
    err.message = 'This Email is already exist';
    sendErrorClient(err, res);
  }

  sendErrorClient(err, res);
}

function sendErrorClient(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
