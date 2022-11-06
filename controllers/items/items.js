const { JsonResponse } = require("../../lib/apiResponse");
const {
  MSG_SUCCESS,
  MSG_TYPES,
  MSG_ERRORS,
  SUPPORTED_INTEGRATIONS,
} = require("../../constant/msg");
const List = require("../../models/lists");
const Item = require("../../models/items");
const mongoose = require("mongoose");
const validate = require("../../validation");

exports.addItem = async (req, res) => {

  const { error } = validate.validation.validateListItem(req.body);
  if (error)
    return JsonResponse(res, 400, error.details[0].message, null, null);


  try {
    let payload = {
      name: req.body.name,
      description: req.body.description,
      listId: req.body.listId,
    };

    let item = new Item(payload);
    await item.save();

    return JsonResponse(res, 200, MSG_SUCCESS.RESOURCES_CREATED, payload, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
};


// exports.editItem = async (req, res) => {
//   try {
//     let itemId = new mongoose.Types.ObjectId(req.params.itemId);

//     let item = await Item.findOneAndUpdate({ _id: itemId }, req.body);

//     return JsonResponse(res, 200, MSG_SUCCESS.RESOURCES_CREATED, item, null);
//   } catch (error) {
//     JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
//     return;
//   }
// };

exports.duplicateItem = async (req, res) => {
  try {
    let itemId = new mongoose.Types.ObjectId(req.params.itemId);

    let item = await Item.findOne({ _id: itemId });

    let duplicate = new Item(item);

    duplicate._id = mongoose.Types.ObjectId();

    await duplicate.save();

    return JsonResponse(
      res,
      200,
      MSG_SUCCESS.RESOURCES_DUPLICATED,
      duplicate,
      null
    );
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
};
