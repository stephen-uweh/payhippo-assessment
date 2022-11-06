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

exports.createList = async (req, res) => {
  const { error } = validate.validation.validateList(req.body);
  if (error)
    return JsonResponse(res, 400, error.details[0].message, null, null);

  try{
    let payload = {
      name: req.body.name,
    };
  
    let list = new List(payload);
    await list.save();
  
    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_FETCHED, data, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
  
};



exports.allLists = async (req, res) => {
  try{
    let data;
    let lists = await List.find();

    lists.forEach(async function (list) {
      let items = await Item.find({ listId: list._id });
      let payload = {
        name: list.name,
        items: items,
      };
      data.push(payload);
    });

    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_FETCHED, data, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
  
};



exports.singleList = async (req, res) => {
  try{
    let listId = new mongoose.Types.ObjectId(req.params.listId);
    let list = await List.findOne({ _id: listId });

    let items = await Item.find({ listId: listId });

    let data = {
      list: list,
      items: items,
    };

    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_FETCHED, data, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
  
};



exports.singleListItem = async (req, res) => {

  try{
    let itemId = new mongoose.Types.ObjectId(req.params.itemId);
    let listId = new mongoose.Types.ObjectId(req.params.listId);
    let item = await Item.findOne({ _id: itemId, listId: listId });

    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_FETCHED, item, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
  
};



exports.listItems = async (req, res) => {
  try{
    let listId = new mongoose.Types.ObjectId(req.params.listId);
    let items = await Item.find({ listId: listId });

    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_FETCHED, items, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }

};



exports.editList = async (req, res) => {
  try{
    let listId = new mongoose.Types.ObjectId(req.params.listId);
    let list = await List.findOneAndUpdate({ _id: listId }, req.body);

    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_UPDATED, list, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
  
};



exports.editListItems = async (req, res) => {

  try{
    let listId = new mongoose.Types.ObjectId(req.params.listId);


    await Item.updateMany({listId:listId}, req.body);
    let items = await Item.find({listId:listId});

    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_UPDATED, items, null);

  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
 
}



exports.duplicateList = async (req, res) => {

  try{
    let listId = new mongoose.Types.ObjectId(req.params.id);
    let list = await List.findOne({ _id: listId });

    let items = await Item.find({ listId: listId });

    let duplicateList = new List(list);

    duplicateList._id = mongoose.Types.ObjectId();

    await duplicateList.save();

    items.forEach(async function (item) {
      let duplicateItem = new Item(item);

      duplicateItem._id = mongoose.Types.ObjectId();

      duplicate.listId = duplicateList._id;

      await duplicateItem.save();
    });

    return JsonResponse(
      res,
      200,
      MSG_SUCCESS.RESOURCES_DUPLICATED,
      duplicateList,
      null
    );
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
  
};



exports.deleteList = async (req, res) => {
  try{ 

    let listId = new mongoose.Types.ObjectId(req.params.listId);

    await Item.deleteMany({ listId: listId });
  
    await List.findOneAndRemove({ _id: listId });
  
    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_DELETED, null, null);
  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
  
};



exports.deleteListItem = async (req, res) => {
  try{
    let itemId = new mongoose.Types.ObjectId(req.params.itemId);
    let listId = new mongoose.Types.ObjectId(req.params.listId);
    await Item.findOneAndRemove({ _id: itemId, listId: listId });

    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_DELETED, null, null);

  } catch (error) {
    JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, error.message, null);
    return;
  }
};


