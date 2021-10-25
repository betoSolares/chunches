const catchError =
  (handler) =>
  (...args) =>
    handler(...args).catch(args[2]);

export default catchError;
