const validate = async (schema, payload) => {
  try {
    await schema.validateAsync(payload);
  } catch (e) {
    const error = new Error(e);
    error.status = 400;
    throw error;
  }
};

export default validate;
