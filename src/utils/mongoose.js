const { Types } = require('mongoose');
const { isEmpty } = require('./validator');
const { InvalidQueryError } = require('../core/http-exception');


const ObjectToId = function (id) {
  if (isEmpty(id)) {
    throw new InvalidQueryError('ID 为空');
  } else if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return new Types.ObjectId(id);
  } else {
    return id;
  }
}

module.exports = {
  ObjectToId
};