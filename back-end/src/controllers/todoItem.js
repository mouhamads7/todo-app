const todo = require("../models/todoItem");

exports.getAll = async (req, res, next) => {
  try {
    const items = await todo.findAll();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// exports.getOne = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

exports.createOne = async (req, res, next) => {
  try {
    const ITEM = {
      text: req.body.text,
    };

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
