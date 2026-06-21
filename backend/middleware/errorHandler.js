/**
 * 404 handler for unmatched routes.
 */
export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

/**
 * Centralized error handler. Reads an optional `statusCode` set by services
 * (e.g. validation errors) and falls back to 500. Keeps controllers thin.
 */
// eslint-disable-next-line no-unused-vars -- Express requires the 4-arg signature.
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  // Mongoose invalid ObjectId -> 400 Bad Request
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid id: ${err.value}` });
  }

  if (status === 500) {
    console.error("Unhandled error:", err);
  }

  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};
