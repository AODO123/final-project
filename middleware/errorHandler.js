// One place to keep errors consistent
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || (err.name === "ValidationError" ? 400 : 500);
  const message = err.message || "Something went wrong";

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
