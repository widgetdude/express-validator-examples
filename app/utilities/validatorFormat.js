const validatorFormat = ({ location, msg, param, value, nestedErrors }) => {
  return {
    location,
    msg,
    param,
    value: value || null,
    nestedErrors: nestedErrors || null,
  };
};

module.exports = validatorFormat;
