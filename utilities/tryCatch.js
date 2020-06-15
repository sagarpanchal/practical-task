/**
 * Handles exceptions in async function
 * @param   {function} func
 * @returns {promise}
 */
const tryCatch = async (func, options = {}) => {
  options = { returnError: false, logError: true, ...options };
  try {
    return await func();
  } catch (error) {
    options.logError && console.warn(error);
    if (options.returnError) return error;
  }
};

module.exports = tryCatch;
