const Joi = require("joi");


function validateList(list) {
  const Schema = Joi.object().keys({
    name: Joi.string().label("Name").required(),
    
  });

  return Schema.validate(list);
}


function validateListItem(item) {
  const Schema = Joi.object().keys({
    name: Joi.string().label("Name").required(),
    listId: Joi.string().label("List id").required(),
    Description: Joi.string().label("Description").required(),
  });

  return Schema.validate(item);
}

module.exports = {
  validateList,
  validateListItem
};
