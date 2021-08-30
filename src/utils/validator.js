const validateLogin = (name, password) => {
  let errors = {};

  if (isEmpty(name)) {
    errors.name = "账户名称为空";
  }

  if (isEmpty(password)) {
    errors.password = "密码为空";
  }

  return errors;
};

const isEmpty = (value) => {
  if (value === null || value === undefined || value.trim() === '') {
    return true;
  } else {
    return false;
  }
};

const validateId = (id) => {
  if (!isEmpty(id) && id.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isEmpty,
  validateId,
  validateLogin
};