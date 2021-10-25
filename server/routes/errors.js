export const notFound = (_, res, next) => {
  res.status(404).json({ message: "Route not found" });
  next();
};

export const internalError = (err, _, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
  next();
};
