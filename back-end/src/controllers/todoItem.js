const todo = require("../models/todoItem");

exports.getAll = async (req, res, next) => {
  try {
    const items = await todo.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const ITEM = {
      text: req.body.text,
      state: req.body.state,
    };

    if (ITEM.state !== "active" && ITEM.state !== "completed") {
      return res.status(400).json("Invalid item state provided");
    }

    try {
      if (ITEM.text == "") return res.status(400).json("Text can't be empty!");
      const user = await todo.create(ITEM);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const ITEM = {
      text: req.body.text,
      state: req.body.state,
    };

    try {
      const user = await todo.update(ITEM, {
        where: { id: req.params.id },
      });
      if (user == 0) return res.status(400).json("Item not found!");
      return res.status(200).json(user);
    } catch (error) {}
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const user = await todo.destroy({ where: { id: req.params.id } });
    if (user == 0) return res.status(400).json("Item not found!");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCompleted = async (req, res, next) => {
  try {
    const state = "completed";
    const user = await todo.destroy({ where: { state: state } });
    if (user == 0) return res.status(400).json("Item not found!");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
